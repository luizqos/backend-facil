const { Model, DataTypes } = require('sequelize')

class ProdutosClientes extends Model {
    static init(sequelize) {
        super.init(
            {
                idProdutosClientes: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                produtos_id: {
                    type: DataTypes.INTEGER,
                },
                clientes_id: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'produtos_clientes',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }

    static associate(models) {
        this.hasOne(models.Produtos, {
            foreignKey: 'idProdutos',
            sourceKey: 'produtos_id',
            as: 'produto',
        })
    }
}

module.exports = ProdutosClientes
