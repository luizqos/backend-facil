const moment = require('moment')
const clienteRepository = require('../repository/cliente.repository')
//const produtoRepository = require('../repository/produto.repository')

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
        return res.status(200).json(cliente)
    }
}

module.exports = new VendasController()
