module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Absensi = sequelize.define("absensi", {
        id_absensi: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        jam_keluar: {
            type: Sequelize.TIME,
            allowNull: true,
        },
        jam_masuk: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        lokasi_keluar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        lokasi_masuk: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tanggal_absen: {
            type: Sequelize.DATE,
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
    
    return Absensi;
};