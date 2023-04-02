module.exports = (sequelize, Sequelize) => {
    const Clientes = sequelize.define(
        'clientes',
        {
            idClientes: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            nomeCliente: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
            },
            telefone: {
                type: Sequelize.STRING,
            },
            celular: {
                type: Sequelize.STRING,
            },
            dataCadastro: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.INTEGER,
            },
            tipoCobranca: {
                type: Sequelize.STRING,
            },
            dataCobranca: {
                type: Sequelize.STRING,
            },
            userIptv: {
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
    return Clientes
}
