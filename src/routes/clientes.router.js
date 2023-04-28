const clientes = require('../controllers/clientes.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', clientes.buscaTodosClientes)
    router.put('/insere-id-iptv/:cliente', clientes.insereIdIptv)
    app.use('/api/clientes', router)
}
