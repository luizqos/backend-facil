const { Model, DataTypes } = require('sequelize')

class Produtos extends Model {
    static init(sequelize) {
        super.init(
            {
                idProdutos: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                descricao: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                unidade: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                precoCompra: {
                    type: DataTypes.STRING,
                },
                precoVenda: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                tableName: 'produtos',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }
}

module.exports = Produtos
