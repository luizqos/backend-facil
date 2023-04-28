/* eslint-disable no-undef */
const fetch = require('node-fetch')
const puppeteer = require('puppeteer')
const logger = require('../utils/loggerRenovacao')
const clientesRepository = require('../repositories/clientes.repository')

async function aguarde(segundos) {
    return new Promise((resolve) => setTimeout(resolve, segundos * 1000))
}
class RenovacaoController {
    async renovaAssinaturaCliente(req, res) {
        try {
            const separador = '-'.repeat(100)
            const { cliente } = req.params
            const dadosWhere = { userIptv: cliente }
            const buscaCliente = await clientesRepository.buscaCliente(
                dadosWhere
            )
            if (!buscaCliente) {
                logger.info(separador)
                logger.info(`O ${cliente} não faz parte da sua lista`)
                return res
                    .status(404)
                    .send({ message: `Cliente ${cliente} não encontrado` })
            }
            logger.info(separador)
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

            // Busca quantidade de creditos
            const buscaCredito = await page.evaluate(() => {
                const credito = document.getElementsByClassName(
                    'credits no-waves-effect badge badge-pill badge-danger'
                )
                return Array.from(credito).map((creditos) => creditos.innerText) // as you see, now this function returns array of texts instead of Array of elements
            })

            if (buscaCredito[0] == '0 CRÉDITOS') {
                logger.info(
                    `Você não possui creditos, adicione creditos e renove o cliente ${cliente}`
                )
                await browser.close()
                return res
                    .status(400)
                    .send({ message: 'Você não possui créditos.' })
            } else {
                logger.info(`Você possui ${buscaCredito}`)
                logger.info(`Renovando o cliente ${cliente}`)

                //Entrando na pagina de clientes
                await page.goto(`${process.env.URL}/clients/`)

                // buscar cliente
                await page.type('[type="search"]', cliente)
                await aguarde(5)
                await page.click('a.btn.btn-sm.btrenewplus')
                await aguarde(3)
                //Descomente a linha abaixo para Renovar assinatura, Cuidado depois de renovar o credito será feito ao cliente.
                await page.click(
                    'button.btn.btn-primary.bg-gradient.waves-effect.waves-light.btnrenewplus'
                )
                await aguarde(3)
                await browser.close()
                logger.info(`Assinatura renovada para o Cliente ${cliente}`)
                return res.status(200).send({
                    message: `Assinatura renovada para o cliente ${cliente}`,
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }

    async renovaAssinatura(req, res) {
        try {
            const rota = 'clients'
            const parametros = '?renew_client_plus&client_id='
            const meses = 1

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
            const { idIptv } = buscaCliente
            // Log in and perform POST request
            const login = await fetch(`${process.env.URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    try_login: '1',
                    username: process.env.USUARIO,
                    password: process.env.SENHA,
                }),
            })

            if (!login.ok) {
                throw new Error('Ocorreu um erro ao fazer o Login.')
            }
            // Store cookie in local storage
            const cookie = login.headers.get('set-cookie')
            //localStorage.setItem('cookie', cookie)

            // Perform POST request with cookie
            const response = await fetch(
                `${process.env.URL}/${rota}/api/${parametros}${idIptv}&months=${meses}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Cookie: cookie,
                    },
                }
            )

            if (!response.ok) {
                throw new Error(
                    'Erro ao executar a ativação ou inativação do usuario'
                )
            }
            const result = JSON.parse(await response.text())
            return res.status(200).send(result)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }
}

module.exports = new RenovacaoController()
