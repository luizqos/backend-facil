const itensDeVendas = require('../models/itensDeVendas.model')

class ItensDeVendasRepository {
    async criaItensDeVendas(dadosParaCriarLancamento) {
        try {
            return await itensDeVendas.bulkCreate(dadosParaCriarLancamento)
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ItensDeVendasRepository()
