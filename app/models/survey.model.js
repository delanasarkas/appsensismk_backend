module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Survey = sequelize.define("survey", {
        id_survey: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        status_survey: {
            type: Sequelize.ENUM,
            values: ['selesai', 'proses'],
            allowNull: false,
        },
        hasil_survey: {
            type: Sequelize.STRING,
            allowNull: true,
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

    return Survey;
};