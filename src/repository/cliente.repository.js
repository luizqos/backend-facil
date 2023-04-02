const db = require('../models')
const Cliente = db.clientes
const Vendas = db.vendas
const Lancamentos = db.lancamentos
const Op = db.Sequelize.Op

class ClientesRepository {
    async buscaTodosClientes(title) {
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
        try {
            return await Cliente.findAll({ where: condition })
        } catch (error) {
            throw new Error(error)
        }
    }

    async buscaClientePorId(dadosWhere) {
        try {
            return await Cliente.findOne({
                where: dadosWhere,
                include: [
                    {
                        model: Vendas,
                        required: true,
                        order: [['dataVenda', 'DESC']],
                        limit: 50,
                        attributes: {
                            exclude: ['lancamentos_id', 'clientes_id'],
                        },
                        include: [
                            {
                                model: Lancamentos,
                                required: true,
                                attributes: {
                                    exclude: ['vendas_id'],
                                },
                            },
                        ],
                    },
                ],
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = new ClientesRepository()
