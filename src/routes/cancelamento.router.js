const cancelamento = require('../controllers/cancelamento.controller.js')
const router = require('express').Router()

module.exports = (app) => {
    router.post('/:cliente', cancelamento.cancelaAssinaturaCliente)
    app.use('/api/cancelamento', router)
}
