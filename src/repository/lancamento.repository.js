const db = require('../models')
const lancamentos = db.lancamentos

class LancamentosRepository {
    async criaLancamento(dadosParaCriarLancamento) {
        try {
            return await lancamentos.bulkCreate([dadosParaCriarLancamento])
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LancamentosRepository()
