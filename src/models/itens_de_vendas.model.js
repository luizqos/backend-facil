module.exports = (sequelize, Sequelize) => {
    const ItensDeVendas = sequelize.define(
        'itens_de_vendas',
        {
            idItens: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            subTotal: {
                type: Sequelize.DECIMAL,
            },
            quantidade: {
                type: Sequelize.INTEGER,
            },
            preco: {
                type: Sequelize.DECIMAL,
            },
            vendas_id: {
                type: Sequelize.INTEGER,
            },
            produtos_id: {
                type: Sequelize.INTEGER,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )

    return ItensDeVendas
}
