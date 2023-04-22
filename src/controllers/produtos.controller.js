const produtosRepository = require('../repositories/produtos.repository')

class ProdutosController {
    async buscaTodosProdutos(req, res) {
        const { title } = req.query
        const produtos = await produtosRepository.buscaTodosProdutos(title)
        return res.send(produtos)
    }
}

module.exports = new ProdutosController()
