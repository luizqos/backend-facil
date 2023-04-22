const { Model, DataTypes } = require('sequelize')

class ItensDeVendas extends Model {
    static init(sequelize) {
        super.init(
            {
                idItens: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                subTotal: {
                    type: DataTypes.DECIMAL,
                },
                quantidade: {
                    type: DataTypes.INTEGER,
                },
                preco: {
                    type: DataTypes.DECIMAL,
                },
                vendas_id: {
                    type: DataTypes.INTEGER,
                },
                produtos_id: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'itens_de_vendas',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
}

module.exports = ItensDeVendas
