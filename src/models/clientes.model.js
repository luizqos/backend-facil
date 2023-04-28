const { Model, DataTypes } = require('sequelize')

class Clientes extends Model {
    static init(sequelize) {
        super.init(
            {
                idClientes: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                nomeCliente: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                },
                telefone: {
                    type: DataTypes.STRING,
                },
                celular: {
                    type: DataTypes.STRING,
                },
                dataCadastro: {
                    type: DataTypes.STRING,
                },
                status: {
                    type: DataTypes.INTEGER,
                },
                tipoCobranca: {
                    type: DataTypes.STRING,
                },
                dataCobranca: {
                    type: DataTypes.STRING,
                },
                userIptv: {
                    type: DataTypes.STRING,
                },
                idIptv: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                tableName: 'clientes',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }

    static associate(models) {
        this.hasMany(models.Vendas, {
            foreignKey: 'clientes_id',
            targetKey: 'vendas',
            as: 'vendas',
        })
        this.hasMany(models.ProdutosClientes, {
            foreignKey: 'clientes_id',
            targetKey: 'produtos_clientes',
            as: 'produtos_clientes',
        })
    }
}

module.exports = Clientes
