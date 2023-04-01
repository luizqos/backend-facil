module.exports = (app) => {
    const clientes = require('../controllers/cliente.controller.js')
    let router = require('express').Router()
    router.get('/', clientes.buscaTodosClientes)
    app.use('/api/clientes', router)
}
