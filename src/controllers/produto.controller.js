const produtoRepository = require('../repository/produto.repository')

class ProdutosController {
    async buscaTodosProdutos(req, res) {
        const title = req.query.title
        const result = await produtoRepository.buscaTodosProdutos(title)
        return res.status(200).json(result)
    }
}

module.exports = new ProdutosController()
