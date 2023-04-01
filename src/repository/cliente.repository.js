const db = require('../models')
const Cliente = db.clientes
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
}
module.exports = new ClientesRepository()
