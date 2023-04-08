const db = require('../models')
const itensDeVendas = db.itensDeVendas

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
