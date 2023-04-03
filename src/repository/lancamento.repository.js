const db = require('../models')
const lancamentos = db.lancamentos

class LancamentosRepository {
    async buscaUltimoIdLancamento() {
        try {
            return await lancamentos.findOne({
                raw: true,
                order: [['idLancamentos', 'DESC']],
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new LancamentosRepository()
