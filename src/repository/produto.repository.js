const db = require('../models')
const Produto = db.produtos
const Op = db.Sequelize.Op

class ProdutosRepository {
    async buscaTodosProdutos(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await Produto.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ProdutosRepository()
