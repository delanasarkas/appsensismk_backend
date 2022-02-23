module.exports = (sequelize, Sequelize) => {
    // DECLARE
    const Users = sequelize.define("users", {
        id_users: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email_user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nama_user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nohp_user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
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
    
    return Users;
};