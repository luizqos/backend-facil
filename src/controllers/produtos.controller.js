const produtosRepository = require('../repositories/produtos.repository')
const { Op } = require('sequelize')

class ProdutosController {
    async buscaProdutos(req, res) {
        const { api } = req.query
        let filtrosWhere = { api: api }
        if (!api) {
            filtrosWhere = { idProdutos: { [Op.gt]: 0 } }
        }
        const produtos = await produtosRepository.buscaProdutosDinamicamente(
            filtrosWhere
        )
        return res.send(produtos)
    }
}

module.exports = new ProdutosController()
