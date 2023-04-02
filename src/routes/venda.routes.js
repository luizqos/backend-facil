module.exports = (app) => {
    const vendas = require('../controllers/venda.controller.js')
    const router = require('express').Router()
    router.post('/', vendas.criaVendaPorId)
    app.use('/api/vendas', router)
}
