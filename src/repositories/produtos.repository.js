const produtos = require('../models/produtos.model')

class ProdutosRepository {
    async buscaProdutosDinamicamente(filtrosWhere) {
        try {
            return await produtos.findAll({ where: filtrosWhere })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ProdutosRepository()
