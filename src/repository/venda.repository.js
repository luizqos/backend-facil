const db = require('../models')
const vendas = db.vendas

class VendasRepository {
    async buscaUltimoIdVenda() {
        try {
            return await vendas.findOne({
                raw: true,
                order: [['idVendas', 'DESC']],
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new VendasRepository()
