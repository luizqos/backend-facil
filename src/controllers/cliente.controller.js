const clienteRepository = require('../repository/cliente.repository')

class ClientesController {
    async buscaTodosClientes(req, res) {
        const title = req.query.title
        const result = await clienteRepository.buscaTodosClientes(title)
        return res.status(200).json(result)
    }
}

module.exports = new ClientesController()
