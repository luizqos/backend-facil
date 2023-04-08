const moment = require('moment')
const clienteRepository = require('../repository/cliente.repository')
const vendaRepository = require('../repository/venda.repository')
const lancamentoRepository = require('../repository/lancamento.repository')
const itensDeVendasRepository = require('../repository/itensDeVendas.repository')

class VendasController {
    async criaVendaPorId(req, res) {
        const { clienteId } = req.query
        const dadosWhere = { idClientes: clienteId, status: 1 }
        const cliente = await clienteRepository.buscaClientePorId(dadosWhere)

        if (!cliente) {
            return res
                .status(204)
                .json(
                    'Cliente Inativo, Não pode ser atribuida venda ao cliente.'
                )
        }
        //const { vendas } = cliente
        const ultimaVenda = cliente.vendas[0].dataValues
        const ultimoLancamento = ultimaVenda.lancamento

        if (ultimaVenda.pago === 0) {
            return res
                .status(204)
                .json(
                    'Ultima parcela em aberto, Não pode ser atribuida venda ao cliente.'
                )
        }

        let dataAtual = moment().format('YYYY-MM-DD')
        const diferecaMs =
            new Date(dataAtual) - new Date(ultimoLancamento.data_pagamento)
        const diferencaDias = diferecaMs / (1000 * 60 * 60 * 24)

        if (diferencaDias > 31 && ultimaVenda.pago === 1) {
            return res
                .status(204)
                .json(
                    'Cliente desistiu, Não pode ser atribuida venda ao cliente.'
                )
        }

        const mesAtual = moment().format('MM/YYYY')
        const mesUltimaVenda = moment(ultimaVenda.dataVenda).format('MM/YYYY')

        if (mesAtual == mesUltimaVenda && cliente.tipoCobranca == 'M') {
            return res
                .status(204)
                .json(
                    'Ja existe venda para cliente neste mês, Não pode ser atribuida venda ao cliente.'
                )
        }
        if (cliente.tipoCobranca == 'B') {
            return res
                .status(204)
                .json(
                    'Cliente bimestral, Não pode ser atribuida venda ao cliente.'
                )
        }

        try {
            let arrayProdutosCliente = cliente.produtos_clientes
            let valorTotal = 0
            arrayProdutosCliente.map(function (element) {
                valorTotal += parseFloat(element.produto.precoVenda)
                return parseFloat(valorTotal)
            })

            const dataUltimoPagamento = ultimaVenda.lancamento.data_pagamento
            const dataProximoVencimento = moment(dataUltimoPagamento)
                .add(1, 'M')
                .format('YYYY-MM-DD')
            const dadosParaCriarVenda = {
                dataVenda: moment().format('YYYY-MM-DD'),
                valorTotal: valorTotal.toFixed(2),
                faturado: 0,
                clientes_id: parseInt(clienteId),
                usuarios_id: 1,
                pago: 0,
            }
            const vendaCriada = await vendaRepository.criaVenda(
                dadosParaCriarVenda
            )
            const idVenda = vendaCriada[0].idVendas
            const itensVenda = arrayProdutosCliente.map(function (element) {
                return {
                    subTotal: element.produto.precoVenda,
                    quantidade: 1,
                    preco: element.produto.precoVenda,
                    produtos_id: element.produto.idProdutos,
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
                clientes_id: parseInt(clienteId),
                vendas_id: idVenda,
                usuarios_id: 1,
            }

            const lancamentoCriado = await lancamentoRepository.criaLancamento(
                dadosParaCriarLancamento
            )
            const idLancamento = lancamentoCriado[0].idLancamentos
            const dadosParaFaturar = {
                lancamentos_id: idLancamento,
                faturado: 1,
            }
            await vendaRepository.atualizaVenda(dadosParaFaturar, idVenda)
            cliente.idVendaAtual = idVenda
        } catch (error) {
            console.log(error)
        }
        //return res.status(200).json(cliente)

        //-------------  retorno ficará assim ------------------
        return res
            .status(200)
            .json(
                `Venda realizada para o cliente ${cliente.nomeCliente}, Venda Nº: ${cliente.idVendaAtual}`
            )
    }
}

module.exports = new VendasController()
