const produtos = require('../controllers/produtos.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.get('/', produtos.buscaProdutos)
    app.use('/api/produtos', router)
}
