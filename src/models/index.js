const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    logging: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.clientes = require('./clientes.model.js')(sequelize, Sequelize)
db.produtos = require('./produtos.model.js')(sequelize, Sequelize)
db.vendas = require('./vendas.model.js')(sequelize, Sequelize)
db.lancamentos = require('./lancamentos.model.js')(sequelize, Sequelize)

db.clientes.hasMany(db.vendas, {
    foreignKey: 'clientes_id',
    targetKey: 'vendas',
})

db.vendas.hasOne(db.lancamentos, {
    foreignKey: 'vendas_id',
    targetKey: 'lancamentos',
})

module.exports = db
