const fetch = require('node-fetch')
const clientesRepository = require('../repositories/clientes.repository')

class CancelamentoController {
    async cancelaAssinaturaCliente(req, res) {
        try {
            const rota = 'clients'
            const parametros = '?toggle_block&client_id='

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
                `${process.env.URL}/${rota}/api/${parametros}${idIptv}`,
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

module.exports = new CancelamentoController()
