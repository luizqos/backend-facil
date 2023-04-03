const moment = require('moment')
const clienteRepository = require('../repository/cliente.repository')
const vendaRepository = require('../repository/venda.repository')
const lancamentoRepository = require('../repository/lancamento.repository')
const produtoRepository = require('../repository/produto.repository')

class VendasController {
    async criaVendaPorId(req, res) {
        const { idClientes } = req.query
        const dadosWhere = { idClientes, status: 1 }
        const cliente = await clienteRepository.buscaClientePorId(dadosWhere)

        if (!cliente) {
            return res
                .status(204)
                .json(
                    'Cliente Inativo, Não pode ser atribuida venda ao cliente.'
                )
        }
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
            const { idVendas } = await vendaRepository.buscaUltimoIdVenda()
            const vendaId = idVendas + 1
            cliente.idProximaVenda = vendaId
            const { idLancamentos } =
                await lancamentoRepository.buscaUltimoIdLancamento()
            const lancamentoId = idLancamentos + 1

            let arrayProdutosCliente = cliente.produtos_clientes
            let produtosCliente = arrayProdutosCliente.map(function (element) {
                return element.produtos_id
            })

            const whereProduto = { idProdutos: produtosCliente }
            const produtosAssociado =
                await produtoRepository.buscaProdutosPorId(whereProduto)

            let arrayprodutosAssociado = produtosAssociado
            let somaPreco = 0
            arrayprodutosAssociado.map(function (element) {
                somaPreco += parseFloat(element.precoVenda)
                return parseFloat(somaPreco)
            })
            const valorTotal = somaPreco

            const dataUltimoPagamento = ultimaVenda.lancamento.data_pagamento
            const dataProximoVencimento = moment(dataUltimoPagamento)
                .add(1, 'M')
                .format('YYYY-MM-DD')

            const criaVenda = {
                dataVenda: moment().format('YYYY-MM-DD'),
                valorTotal: valorTotal.toFixed(2),
                faturado: 1,
                clientes_id: parseInt(idClientes),
                usuarios_id: 1,
                lancamento_id: lancamentoId,
                descricao: `Lista IPTV - Ref: ${mesAtual} Nº:${vendaId}`,
                pago: 0,
            }

            const criaLancamento = {
                descricao: `Lista IPTV - Ref: ${mesAtual} Nº:${vendaId}`,
                valor: valorTotal.toFixed(2),
                vencimento: dataProximoVencimento,
                baixado: 0,
                nomeCliente: cliente.nomeCliente,
                forma_pgto: 'Pix',
                tipo: 'receita',
                clientes_id: parseInt(idClientes),
                vendas_id: vendaId,
                usuarios_id: 1,
            }

            console.log([criaVenda, criaLancamento])
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json(cliente)

        //  -------------  retorno ficará assim ------------------
        // return res
        //     .status(200)
        //     .json(
        //         `Venda realizada para o cliente ${cliente.nomeCliente}, Venda Nº: ${cliente.idProximaVenda}`
        //     )
    }
}

module.exports = new VendasController()
