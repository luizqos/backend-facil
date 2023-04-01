module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define(
        'produtos',
        {
            idProdutos: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            unidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            precoCompra: {
                type: Sequelize.STRING,
            },
            precoVenda: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )

    return Produto
}
