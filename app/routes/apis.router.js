const express = require('express');
let app = express.Router();
const pelanggan = require("../controllers/pelanggan.controller.js");
const pemesanan = require("../controllers/pemesanan.controller.js");
const survey = require("../controllers/survey.controller.js");
const tagihan = require("../controllers/tagihan.controller.js");
const pembayaran = require("../controllers/pembayaran.controller.js");
const client = require("../controllers/client.controller.js");

// API PELANGGAN
app.post('/pelanggan/create', pelanggan.create);
app.put('/pelanggan/update/:id', pelanggan.update);
app.delete('/pelanggan/delete/:id', pelanggan.delete);

// API PEMESANAN
app.post('/pemesanan/create', pemesanan.create);
app.put('/pemesanan/update/:id', pemesanan.update);
app.delete('/pemesanan/delete/:id', pemesanan.delete);

// API SURVEY
app.post('/survey/create', survey.create);
app.put('/survey/update/:id', survey.update);
app.delete('/survey/delete/:id', survey.delete);

// API TAGIHAN
app.post('/tagihan/create', tagihan.create);
app.put('/tagihan/update/:id', tagihan.update);
app.delete('/tagihan/delete/:id', tagihan.delete);

// API PEMBAYARAN
app.post('/pembayaran/create', pembayaran.create);
app.delete('/pembayaran/delete/:id', pembayaran.delete);

// API CLIENT
app.get('/client/absensi-today/:id', client.getAbsensiToday);
app.get('/client/survey-all/:id', client.getSurveyAll);
app.get('/client/survey-today/:id', client.getSurveyToday);
app.get('/client/survey-alert/:id', client.getSurveyAlert);
app.get('/client/detail-survey/:id', client.getDetailSurvey);
app.get('/client/check-absensi/:id', client.getAbsensiExist);
app.get('/client/statistik/:id', client.getStatistik);
app.get('/client/history-absen/:id', client.getHistoryAbsen);
app.post('/client/absen-masuk', client.postAbsensiMasuk);
app.put('/client/absen-keluar/:id', client.postAbsensiKeluar);
app.put('/client/survey-selesai/:id', client.surveySelesai);

module.exports = app