module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Pelanggan = sequelize.define("pelanggan", {
        id_pelanggan: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        alamat_pelanggan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email_pelanggan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nama_pelanggan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nohp_pelanggan: {
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

    return Pelanggan;
};