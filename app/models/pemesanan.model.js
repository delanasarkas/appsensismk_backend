module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Pemesanan = sequelize.define("pemasanan", {
        id_pemesanan: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        no_order: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        deskripsi_pemesanan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tgl_pemesanan: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status_pemesanan: {
            type: Sequelize.ENUM,
            values: ['selesai', 'proses'],
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

    return Pemesanan;
};