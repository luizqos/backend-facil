module.exports = (sequelize, Sequelize) => {
    const Lancamentos = sequelize.define(
        'lancamentos',
        {
            idLancamentos: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            data_vencimento: {
                type: Sequelize.STRING,
            },
            data_pagamento: {
                type: Sequelize.STRING,
            },
            forma_pgto: {
                type: Sequelize.STRING,
            },
            valor: {
                type: Sequelize.DECIMAL,
            },
            desconto: {
                type: Sequelize.DECIMAL,
            },
            valor_desconto: {
                type: Sequelize.DECIMAL,
            },
            baixado: {
                type: Sequelize.INTEGER,
            },
            vendas_id: {
                type: Sequelize.INTEGER,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    )
    return Lancamentos
}
