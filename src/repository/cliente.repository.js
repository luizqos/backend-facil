const db = require('../models')
const clientes = db.clientes
const vendas = db.vendas
const lancamentos = db.lancamentos
const produtosCliente = db.produtosClientes
const Op = db.Sequelize.Op

class ClientesRepository {
    async buscaTodosClientes(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await clientes.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaClientePorId(dadosWhere) {
        try {
            return await clientes.findOne({
                where: dadosWhere,
                include: [
                    {
                        model: vendas,
                        required: true,
                        order: [['dataVenda', 'DESC']],
                        limit: 50,
                        attributes: {
                            exclude: ['lancamentos_id', 'clientes_id'],
                        },
                        include: [
                            {
                                model: lancamentos,
                                required: true,
                                attributes: {
                                    exclude: ['vendas_id'],
                                },
                            },
                        ],
                    },
                    {
                        model: produtosCliente,
                        required: true,
                        attributes: {
                            exclude: ['idProdutosClientes', 'clientes_id'],
                        },
                    },
                ],
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ClientesRepository()
