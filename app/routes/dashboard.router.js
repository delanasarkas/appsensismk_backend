const express = require('express');
let app = express.Router();
const db = require("../models");
const User = db.users;
const Pelanggan = db.pelanggan;
const Pemesanan = db.pemesanan;
const Survey = db.survey;
const Tagihan = db.tagihan;
const Pembayaran = db.pembayaran;
const Absensi = db.absensi;
const { Op, QueryTypes } = require("sequelize");
// MOMENT
const moment= require('moment');

app.get('/', function (req, res) {
    if(req.session.userLogin) {
        Pelanggan.count()
        .then((response) => {
            db.sequelize.query(`SELECT COUNT(id_pemesanan) as pemesanan FROM pemasanans WHERE DATE(created_at) = CURDATE()`, {
                type: QueryTypes.SELECT
            })
            .then((response2) => {
                db.sequelize.query(`SELECT COUNT(id_survey) as survey FROM surveys WHERE DATE(created_at) = CURDATE()`, {
                    type: QueryTypes.SELECT
                })
                .then((response3) => {
                    db.sequelize.query(`SELECT COUNT(id_tagihan) as tagihan FROM tagihans WHERE DATE(created_at) = CURDATE()`, {
                        type: QueryTypes.SELECT
                    })
                    .then((response4) => {                   
                        // DECLARE DATA
                        const data = {
                            title: 'Dashboard',
                            sessionUser: req.session.userLogin,
                            pelanggan: response,
                            pemesanan: response2,
                            survey: response3,
                            tagihan: response4
                        }
                    
                        // RESPONSE
                        res.render('dashboard/dashboard', data);
                    })
                })
            })
        })
    } else {
        res.redirect('/login');
    }
});

// ======= KARYAWAN
app.get('/karyawan', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        User.findAll({
            where: {
                role: 'karyawan'
            }
        })
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Karyawan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/karyawan/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/karyawan/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        // DECLARE DATA
        const data = {
            title: 'Tambah Karyawan',
            sessionUser: req.session.userLogin
        }
    
        // RESPONSE
        res.render('dashboard/karyawan/create', data);
    } else {
        res.redirect('/login');
    }
});

app.get('/karyawan/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        User.findOne({
            where: {
              id_users: id
            }
        })
        .then((response) => {
            // DECLARE DATA
            const data = {
                title: 'Ubah Karyawan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/karyawan/edit', data);
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});

// ======= END KARYAWAN

// ========================================================================================

// ======= PELANGGAN
app.get('/pelanggan', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Pelanggan.findAll()
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Pelanggan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pelanggan/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/pelanggan/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        // DECLARE DATA
        const data = {
            title: 'Tambah Pelanggan',
            sessionUser: req.session.userLogin
        }
    
        // RESPONSE
        res.render('dashboard/pelanggan/create', data);
    } else {
        res.redirect('/login');
    }
});

app.get('/pelanggan/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Pelanggan.findOne({
            where: {
              id_pelanggan: id
            }
        })
        .then((response) => {
            // DECLARE DATA
            const data = {
                title: 'Ubah Pelanggan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pelanggan/edit', data);
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});

// ======= END PELANGGAN

// ========================================================================================

// ======= PEMESANAN
app.get('/pemesanan', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Pemesanan.findAll()
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Pemesanan',
                data: response,
                moment: moment,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pemesanan/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/pemesanan/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        // DECLARE DATA
        let dateNow = moment().format('YYYY-MM-DD');

        Pelanggan.findAll()
        .then((response) => {
            const data = {
                title: 'Tambah Pemesanan',
                datenow: dateNow,
                pelanggan: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pemesanan/create', data);
        })
        
    } else {
        res.redirect('/login');
    }
});

app.get('/pemesanan/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Pemesanan.findOne({
            where: {
              id_pemesanan: id
            }
        })
        .then((response) => {
            Pelanggan.findAll()
            .then((response2) => {
                const data = {
                    title: 'Ubah Pemesanan',
                    data: response,
                    pelanggan: response2,
                    moment: moment,
                    sessionUser: req.session.userLogin
                }
            
                // RESPONSE
                res.render('dashboard/pemesanan/edit', data);
            })
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});

// ======= END PEMESANAN

// ========================================================================================

// ======= SURVEY
app.get('/survey', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Survey.findAll({include: ['users', 'pemesanan']})
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Survey',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/survey/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/survey/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Pemesanan.findAll({
            where: {
                status_pemesanan: 'proses'
            }
        })
        .then(response => {
            User.findAll({where: {role: 'karyawan'}})
            .then(response2 => {
                // DECLARE DATA
                const data = {
                    title: 'Tambah Survey',
                    data_pemesanan: response,
                    data_karyawan: response2,
                    sessionUser: req.session.userLogin
                }
            
                // RESPONSE
                res.render('dashboard/survey/create', data);
            })
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/survey/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Survey.findOne({
            where: {
              id_survey: id
            },
            include: ['pemesanan']
        })
        .then((response) => {
            Pemesanan.findAll()
            .then(response2 => {
                User.findAll({where: {role: 'karyawan'}})
                .then(response3 => {
                    // DECLARE DATA
                    const data = {
                        title: 'Ubah Survey',
                        data: response,
                        data_pemesanan: response2,
                        data_karyawan: response3,
                        sessionUser: req.session.userLogin
                    }
                
                    // RESPONSE
                    res.render('dashboard/survey/edit', data);
                })
            })
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});

// ======= END SURVEY

// ========================================================================================

// ======= TAGIHAN
app.get('/tagihan', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Tagihan.findAll({include: [
            {
                model: Survey,
                as: 'survey',
                include: ['pemesanan']
            }
        ]})
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Tagihan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/tagihan/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/tagihan/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Survey.findAll({include: [
            {
                model: Pemesanan,
                as: 'pemesanan',
                where: {
                    status_pemesanan: 'proses'
                }
            }
            ], 
            where: {status_survey: 'selesai'}
        })
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Tambah Tagihan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/tagihan/create', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/tagihan/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Tagihan.findOne({
            where: {
              id_tagihan: id
            },include: [
                {
                    model: Survey,
                    as: 'survey',
                    include: ['pemesanan']
                }
            ]
        })
        .then((response) => {
            // DECLARE DATA
            const data = {
                title: 'Ubah Tagihan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/tagihan/edit', data);
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/tagihan/invoice', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Tagihan.findOne({
            where: {
              id_tagihan: id
            },include: [
                {
                    model: Survey,
                    as: 'survey',
                    include: [{
                        model: Pemesanan,
                        as: 'pemesanan',
                        include: ['pelanggan']
                    }]
                }
            ]
        })
        .then((response) => {
            // DECLARE DATA
            const data = {
                title: 'Invoice',
                data: response,
                moment: moment,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/tagihan/invoice', data);
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});
// ======= END TAGIHAN

// ========================================================================================

// ======= PEMBAYARAN
app.get('/pembayaran', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Pembayaran.findAll(
            {
                include: [{
                    model: Tagihan,
                    as: 'tagihan',
                    include: [{
                        model: Survey,
                        as: 'survey',
                        include: ['pemesanan']
                    }]
                }]
            }
        )
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Pembayaran',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pembayaran/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/pembayaran/tambah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        Tagihan.findAll({
            where: {
                status_tagihan: 'belum lunas'
            },
            include: [{
                model: Survey,
                as: 'survey',
                include: ['pemesanan']
            }]
        })
        .then((response) => {
            // DECLARE DATA
            let list_pembayaran = [
                'Tunai',
                'BCA',
                'BNI',
                'Mandiri',
                'BRI'
            ];

            const data = {
                title: 'Tambah Pembayaran',
                data: response,
                list_pembayaran: list_pembayaran,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pembayaran/create', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/pembayaran/ubah', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'manager') {
        const id = req.query.id;

        Pelanggan.findOne({
            where: {
              id_pelanggan: id
            }
        })
        .then((response) => {
            // DECLARE DATA
            const data = {
                title: 'Ubah Pelanggan',
                data: response,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/pelanggan/edit', data);
        })
        .catch(() => {
            console.clear();
        })
    } else {
        res.redirect('/login');
    }
});
// ======= END PEMBAYARAN

// ========================================================================================

// ======= ABSENSI
app.get('/absensi', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'hrd') {
        Absensi.findAll({
            include: ['users']
        })
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Absensi',
                data: response,
                moment: moment,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/absensi/index', data);
        })
    } else {
        res.redirect('/login');
    }
});

app.get('/absensi-filter', function (req, res) {
    if(req.session.userLogin && req.session.userLogin.role == 'hrd') {
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;

        Absensi.findAll({
            include: ['users'],
            where: {
                tanggal_absen: {
                    [Op.between]: [startDate, endDate],
                },
            }
        })
        .then(response => {
            // DECLARE DATA
            const data = {
                title: 'Absensi',
                data: response,
                moment: moment,
                sessionUser: req.session.userLogin
            }
        
            // RESPONSE
            res.render('dashboard/absensi/index', data);
        })
    } else {
        res.redirect('/login');
    }
});
// ======= END ABSENSI

module.exports = app