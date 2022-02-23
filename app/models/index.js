const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// INCLUDE MODEL
db.users = require("../models/users.model.js")(sequelize, Sequelize);
db.tagihan = require("../models/tagihan.model.js")(sequelize, Sequelize);
db.survey = require("../models/survey.model.js")(sequelize, Sequelize);
db.pemesanan = require("../models/pemesanan.model.js")(sequelize, Sequelize);
db.pembayaran = require("../models/pembayaran.model.js")(sequelize, Sequelize);
db.pelanggan = require("../models/pelanggan.model.js")(sequelize, Sequelize);
db.absensi = require("../models/absensi.model.js")(sequelize, Sequelize);

// ASSOCIATE
// #USERS
db.users.hasMany(db.survey, {
    foreignKey: 'id_users',
    onDelete: 'cascade',
    as: 'survey',
})
db.users.hasMany(db.absensi, {
    foreignKey: 'id_users',
    onDelete: 'cascade',
    as: 'absensi',
})


// #SURVEY
db.survey.hasMany(db.tagihan, {
    foreignKey: 'id_survey',
    onDelete: 'cascade',
    as: 'tagihan',
})
db.survey.belongsTo(db.users, {
    foreignKey: 'id_users',
    as: 'users',
})
db.survey.belongsTo(db.pemesanan, {
    foreignKey: 'id_pemesanan',
    as: 'pemesanan',
})


// #ABSENSI
db.absensi.belongsTo(db.users, {
    foreignKey: 'id_users',
    as: 'users',
})


// #TAGIHAN
db.tagihan.belongsTo(db.survey, {
    foreignKey: 'id_survey',
    as: 'survey',
})
db.tagihan.hasMany(db.pembayaran, {
    foreignKey: 'id_tagihan',
    onDelete: 'cascade',
    as: 'pembayaran',
})


// #PEMESANAN
db.pemesanan.hasMany(db.survey, {
    foreignKey: 'id_pemesanan',
    onDelete: 'cascade',
    as: 'survey',
})
db.pemesanan.belongsTo(db.pelanggan, {
    foreignKey: 'id_pelanggan',
    as: 'pelanggan',
})


// #PEMBAYARAN
db.pembayaran.belongsTo(db.tagihan, {
    foreignKey: 'id_tagihan',
    as: 'tagihan',
})


// #PELANGGAN
db.pelanggan.hasMany(db.pemesanan, {
    foreignKey: 'id_pelanggan',
    onDelete: 'cascade',
    as: 'pemesanan',
})

module.exports = db;