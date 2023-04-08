module.exports = (sequelize, Sequelize) => {
    const Vendas = sequelize.define(
        'vendas',
        {
            idVendas: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            dataVenda: {
                type: Sequelize.STRING,
            },
            valorTotal: {
                type: Sequelize.DECIMAL,
            },
            desconto: {
                type: Sequelize.DECIMAL,
            },
            valor_desconto: {
                type: Sequelize.DECIMAL,
            },
            faturado: {
                type: Sequelize.INTEGER,
            },
            clientes_id: {
                type: Sequelize.INTEGER,
            },
            lancamentos_id: {
                type: Sequelize.INTEGER,
            },
            usuarios_id: {
                type: Sequelize.INTEGER,
            },
            lancamentos_descricao: {
                type: Sequelize.STRING,
            },
            pago: {
                type: Sequelize.INTEGER,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
    return Vendas
}
