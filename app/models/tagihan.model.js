module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Tagihan = sequelize.define("tagihan", {
        id_tagihan: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        status_tagihan: {
            type: Sequelize.ENUM,
            values: ['lunas', 'belum lunas'],
            allowNull: false,
        },
        total_tagihan: {
            type: Sequelize.INTEGER(100),
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

    return Tagihan;
};