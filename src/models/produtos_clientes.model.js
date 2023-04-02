module.exports = (sequelize, Sequelize) => {
    const ProdutosClientes = sequelize.define(
        'produtos_clientes',
        {
            idProdutosClientes: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            produtos_id: {
                type: Sequelize.INTEGER,
            },
            clientes_id: {
                type: Sequelize.INTEGER,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )

    return ProdutosClientes
}
