const { Model, DataTypes } = require('sequelize')

class Vendas extends Model {
    static init(sequelize) {
        super.init(
            {
                idVendas: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                dataVenda: {
                    type: DataTypes.STRING,
                },
                valorTotal: {
                    type: DataTypes.DECIMAL,
                },
                desconto: {
                    type: DataTypes.DECIMAL,
                },
                valor_desconto: {
                    type: DataTypes.DECIMAL,
                },
                faturado: {
                    type: DataTypes.INTEGER,
                },
                clientes_id: {
                    type: DataTypes.INTEGER,
                },
                lancamentos_id: {
                    type: DataTypes.INTEGER,
                },
                usuarios_id: {
                    type: DataTypes.INTEGER,
                },
                lancamentos_descricao: {
                    type: DataTypes.STRING,
                },
                pago: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                tableName: 'vendas',
                timestamps: false,
                createdAt: false,
                updatedAt: false,
            }
        )
    }

    static associate(models) {
        this.hasOne(models.Lancamentos, {
            foreignKey: 'vendas_id',
            targetKey: 'lancamentos',
            as: 'lancamentos',
        })
    }
}

module.exports = Vendas
