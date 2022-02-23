module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Pembayaran = sequelize.define("pembayaran", {
        id_pembayaran: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        jenis_pembayaran: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    });

    return Pembayaran;
};