/* eslint-disable no-prototype-builtins */
const produtosRepository = require('../repositories/produtos.repository')
const { Op } = require('sequelize')
class ProdutosController {
    async buscaProdutos(req, res) {
        try {
            const queryParams = req.query
            const filtrosWhere = {}

            Object.keys(queryParams).map((key) => {
                filtrosWhere[key] = { [Op.like]: `%${queryParams[key]}%` }
            })
            const produtos =
                await produtosRepository.buscaProdutosDinamicamente(
                    filtrosWhere
                )
            if (!produtos.length) {
                return res.status(204).send()
            }

            return res.send(produtos)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }
}

module.exports = new ProdutosController()
