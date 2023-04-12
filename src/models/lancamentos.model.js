const { Model, DataTypes } = require('sequelize')

class Lancamentos extends Model {
    static init(sequelize) {
        super.init(
            {
                idLancamentos: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                data_vencimento: {
                    type: DataTypes.STRING,
                },
                data_pagamento: {
                    type: DataTypes.STRING,
                },
                forma_pgto: {
                    type: DataTypes.STRING,
                },
                cliente_fornecedor: {
                    type: DataTypes.STRING,
                },
                valor: {
                    type: DataTypes.DECIMAL,
                },
                desconto: {
                    type: DataTypes.DECIMAL,
                },
                valor_desconto: {
                    type: DataTypes.DECIMAL,
                },
                baixado: {
                    type: DataTypes.INTEGER,
                },
                vendas_id: {
                    type: DataTypes.INTEGER,
                },
                descricao: {
                    type: DataTypes.STRING,
                },
                tipo: {
                    type: DataTypes.STRING,
                },
                clientes_id: {
                    type: DataTypes.INTEGER,
                },
                usuarios_id: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'lancamentos',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
}

module.exports = Lancamentos
