const db = require('../models')
const produtos = db.produtos
const Op = db.Sequelize.Op

class ProdutosRepository {
    async buscaTodosProdutos(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await produtos.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ProdutosRepository()
