const vendas = require('../models/vendas.model')

class VendasRepository {
    async criaVenda(dadosParaCriarVenda) {
        try {
            return await vendas.create(dadosParaCriarVenda)
        } catch (error) {
            throw new Error(error)
        }
    }
    async atualizaVenda(dadosParaFaturar, idVenda) {
        try {
            return await vendas.update(dadosParaFaturar, {
                where: { idVendas: idVenda },
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new VendasRepository()
