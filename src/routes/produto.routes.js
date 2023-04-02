module.exports = (app) => {
    const produtos = require('../controllers/produto.controller.js')
    const router = require('express').Router()
    router.get('/', produtos.buscaTodosProdutos)
    app.use('/api/produtos', router)
}
