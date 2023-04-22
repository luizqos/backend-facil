require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const database = require('./src/models')
const port = process.env.PORT || 3000
const router = require('./src/router')

const corsOptions = {
    origin: 'http://localhost:8081',
}

database
    .sync()
    .then(() => console.log('Banco Sincronizado'))
    .catch((err) => console.log(`Falha ao conectar no Banco: ${err.message}`))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () =>
    console.log(`Servidor está sendo executado na porta ${port}.`)
)
