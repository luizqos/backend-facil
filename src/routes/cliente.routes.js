module.exports = (app) => {
    const clientes = require('../controllers/cliente.controller.js')
    const router = require('express').Router()
    router.get('/', clientes.buscaTodosClientes)
    app.use('/api/clientes', router)
}
