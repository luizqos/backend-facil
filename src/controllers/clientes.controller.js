/* eslint-disable no-undef */
const puppeteer = require('puppeteer')
const clientesRepository = require('../repositories/clientes.repository')

async function aguarde(segundos) {
    return new Promise((resolve) => setTimeout(resolve, segundos * 1000))
}
class ClientesController {
    async buscaTodosClientes(req, res) {
        const { title } = req.query
        const clientes = await clientesRepository.buscaTodosClientes(title)
        return res.send(clientes)
    }

    async insereIdIptv(req, res) {
        try {
            const { cliente } = req.params
            const dadosWhere = { userIptv: cliente }
            const buscaCliente = await clientesRepository.buscaCliente(
                dadosWhere
            )
            if (!buscaCliente) {
                return res
                    .status(404)
                    .send({ message: `Cliente ${cliente} não encontrado` })
            }
            const browser = await puppeteer.launch({
                headless: true, //Altere para true para ocultar navegador na execução
            })
            const page = await browser.newPage()

            await page.goto(`${process.env.URL}/login`)

            // Set screen size
            await page.setViewport({ width: 1366, height: 768 })

            // Login
            await page.type('[name="username"]', process.env.USUARIO)
            await page.type('[name="password"]', process.env.SENHA)
            await page.click('[type="submit"]')
            await page.waitForNavigation({ waitUntil: 'load' })

            //Entrando na pagina de clientes
            await page.goto(`${process.env.URL}/clients/`)

            // buscar cliente
            await page.type('[type="search"]', cliente)
            await aguarde(5)
            const dados = await page.evaluate(() => {
                return {
                    idCliente: document.querySelector('.sorting_1').innerText,
                }
            })
            if (!dados.idCliente) {
                return res
                    .status(404)
                    .send({ message: 'Cliente não encontrado no Portal' })
            }
            const idCliente = dados.idCliente
            // todo fazer put do cliente
            await aguarde(3)
            await browser.close()
            return res.status(200).send({
                message: `O idIptv do cliente ${cliente} é ${idCliente}`,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }
}

module.exports = new ClientesController()
