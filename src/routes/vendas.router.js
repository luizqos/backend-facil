const vendas = require('../controllers/vendas.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.post('/', vendas.criaVendaPorId)
    app.use('/api/vendas', router)
}
