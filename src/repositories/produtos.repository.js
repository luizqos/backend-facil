const produtos = require('../models/produtos.model')
const { Op } = require('sequelize')

class ProdutosRepository {
    async buscaTodosProdutos(title) {
        const condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await produtos.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaProdutosDinamicamente(filtrosWhere) {
        try {
            return await produtos.findAll({ where: filtrosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ProdutosRepository()
