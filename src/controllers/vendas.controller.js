const moment = require('moment')
const clientesRepository = require('../repositories/clientes.repository')
const vendasRepository = require('../repositories/vendas.repository')
const lancamentosRepository = require('../repositories/lancamentos.repository')
const itensDeVendasRepository = require('../repositories/itensDeVendas.repository')
const logger = require('../utils/logger')

class VendasController {
    async criaVendaPorId(req, res) {
        try {
            const { id } = req.query
            const filtrosBuscaCliente = { idClientes: id }

            const cliente = await clientesRepository.buscaClientePorId(
                filtrosBuscaCliente
            )
            if (!cliente.status) {
                logger.info(
                    `Cliente ${id} - ${cliente.nomeCliente} Inativo ou inexistente, Não pode ser atribuida venda ao cliente.`
                )
                return res.status(204).send()
            }

            const ultimaVenda = cliente.vendas[0]
            const ultimoLancamento = ultimaVenda.lancamentos

            if (!ultimaVenda.pago) {
                logger.info(
                    `Ultima parcela em aberto, Não pode ser atribuida venda ao cliente ${id} - ${cliente.nomeCliente}.`
                )
                return res.status(204).send()
            }

            const dataAtual = moment()
            const dataUltimoLancamento = moment(ultimoLancamento.data_pagamento)
            const diferencaDias = dataAtual.diff(dataUltimoLancamento, 'days')

            if (diferencaDias > 31 && ultimaVenda.pago) {
                logger.info(
                    `Cliente ${id} - ${cliente.nomeCliente} desistiu, Não pode ser atribuida venda ao cliente.`
                )
                return res.status(204).send()
            }

            const mesAtual = moment().format('MM/YYYY')
            const mesUltimaVenda = moment(ultimaVenda.dataVenda).format(
                'MM/YYYY'
            )

            if (
                mesAtual === mesUltimaVenda &&
                cliente.tipoCobranca.toUpperCase() === 'M'
            ) {
                logger.info(
                    `Ja existe venda para cliente ${id} - ${cliente.nomeCliente} neste mês, Não pode ser atribuida venda ao cliente.`
                )
                return res.status(204).send()
            }

            if (cliente.tipoCobranca.toUpperCase() === 'B') {
                logger.info(
                    `Cliente bimestral, Não pode ser atribuida venda ao cliente ${id} - ${cliente.nomeCliente}.`
                )
                return res.status(204).send()
            }

            const arrayProdutosCliente = cliente.produtos_clientes
            let valorTotal = 0

            arrayProdutosCliente.map(({ produto }) =>
                parseFloat((valorTotal += parseFloat(produto.precoVenda)))
            )

            const dataUltimoPagamento = ultimaVenda.lancamentos.data_pagamento
            const dataProximoVencimento = moment(dataUltimoPagamento)
                .add(1, 'M')
                .format('YYYY-MM-DD')

            const dadosParaCriarVenda = {
                dataVenda: moment().format('YYYY-MM-DD'),
                valorTotal: valorTotal.toFixed(2),
                faturado: 0,
                clientes_id: parseInt(id),
                usuarios_id: 1,
                pago: 0,
            }

            const vendaCriada = await vendasRepository.criaVenda(
                dadosParaCriarVenda
            )
            const idVenda = vendaCriada.idVendas
            const itensVenda = arrayProdutosCliente.map(({ produto }) => {
                return {
                    subTotal: produto.precoVenda,
                    quantidade: 1,
                    preco: produto.precoVenda,
                    produtos_id: produto.idProdutos,
                    vendas_id: idVenda,
                }
            })

            await itensDeVendasRepository.criaItensDeVendas(itensVenda)

            const dadosParaCriarLancamento = {
                descricao: `Lista IPTV - Ref: ${mesAtual} Nº:${idVenda}`,
                valor: valorTotal.toFixed(2),
                data_vencimento: dataProximoVencimento,
                data_pagamento: '0000-00-00',
                desconto: '0.00',
                valor_desconto: '0.00',
                baixado: 0,
                cliente_fornecedor: cliente.nomeCliente,
                forma_pgto: 'Pix',
                tipo: 'receita',
                clientes_id: parseInt(id),
                vendas_id: idVenda,
                usuarios_id: 1,
            }

            const lancamentoCriado = await lancamentosRepository.criaLancamento(
                dadosParaCriarLancamento
            )

            const { idLancamentos: idLancamento } = lancamentoCriado

            const dadosParaFaturar = {
                lancamentos_id: idLancamento,
                faturado: 1,
            }

            await vendasRepository.atualizaVenda(dadosParaFaturar, idVenda)

            cliente.idVendaAtual = idVenda

            return res.send({
                message: `Venda realizada para o cliente ${cliente.nomeCliente}, Venda Nº: ${cliente.idVendaAtual}`,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }
}

module.exports = new VendasController()
