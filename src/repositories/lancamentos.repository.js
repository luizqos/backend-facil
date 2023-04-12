const lancamentos = require('../models/lancamentos.model')

class LancamentosRepository {
    async criaLancamento(dadosParaCriarLancamento) {
        try {
            return await lancamentos.create(dadosParaCriarLancamento)
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LancamentosRepository()
