const renovacao = require('../controllers/renovacao.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.post('/:cliente', renovacao.renovaAssinaturaCliente)
    app.use('/api/renova-assinatura', router)
}
