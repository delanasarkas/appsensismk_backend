const db = require("../models");
const Absensi = db.absensi;
const Pelanggan = db.pelanggan;
const Survey = db.survey;
const uuid = require('uuid');
const { Op, QueryTypes } = require("sequelize");

const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

// GET HISTROY ABSEN
exports.getHistoryAbsen = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM absensis WHERE id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET ABSENSI TODAY
exports.getAbsensiToday = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM absensis WHERE DATE(tanggal_absen) = CURDATE() AND id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET SURVEY ALL
exports.getSurveyAll = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM surveys, pemasanans WHERE surveys.id_pemesanan = pemasanans.id_pemesanan AND surveys.id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET SURVEY TODAY
exports.getSurveyToday = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM surveys, pemasanans WHERE surveys.id_pemesanan = pemasanans.id_pemesanan AND DATE(surveys.created_at) = CURDATE() AND surveys.id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET SURVEY ALERT
exports.getSurveyAlert = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM surveys, pemasanans WHERE surveys.id_pemesanan = pemasanans.id_pemesanan AND DATE(surveys.created_at) = CURDATE() AND surveys.status_survey = 'proses' AND surveys.id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET SURVEY TODAY
exports.getDetailSurvey = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM pelanggans, pemasanans, surveys WHERE pemasanans.id_pelanggan = pelanggans.id_pelanggan AND surveys.id_pemesanan = pemasanans.id_pemesanan AND surveys.id_survey = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// CHECK ABSENSI EXIST
exports.getAbsensiExist = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM absensis WHERE DATE(tanggal_absen) = CURDATE() AND id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// ABSEN MASUK
exports.postAbsensiMasuk = async (req, res) => {
  try {

    const dataVar = {
        id_absensi: uuid.v4(),
        id_users: req.body.id_users,
        jam_masuk: req.body.jam_masuk,
        lokasi_masuk: req.body.lokasi_masuk,
        tanggal_absen: req.body.tanggal_absen,
    };

    await Absensi.create(dataVar)
    .then((data) => {
        const sendData = {
            meta: {
                code: 201,
                message: `Absen masuk berhasil.`,
            },
            data: data,
        }
        
        res.status(201).send(sendData);
    })
    .catch(err => {
        res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// ABSEN KELUAR
exports.postAbsensiKeluar = async (req, res) => {
  try {
    const id = req.params.id;

    const dataVar = {
        jam_keluar: req.body.jam_keluar,
        lokasi_keluar: req.body.lokasi_keluar,
    };

    await Absensi.update(dataVar, {
      where: { id_absensi: id }
    })
    .then((data) => {
        const sendData = {
            meta: {
                code: 201,
                message: `Absen keluar berhasil.`,
            },
            data: data,
        }
        
        res.status(201).send(sendData);
    })
    .catch(err => {
        res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// SURVEY SELESAI
exports.surveySelesai = async (req, res) => {
  try {
    const id = req.params.id;

    const dataVar = {
      hasil_survey: req.body.hasil_survey,
      status_survey: 'selesai',
    };

    await Survey.update(dataVar, {
      where: { id_survey: id }
    })
    .then((data) => {
        const sendData = {
            meta: {
                code: 201,
                message: `Survey selesai.`,
            },
            data: data,
        }
        
        res.status(201).send(sendData);
    })
    .catch(err => {
        res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET STATISTIK
exports.getStatisik = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT * FROM absensis WHERE DATE(tanggal_absen) = CURDATE() AND id_users = '${id}'`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      const sendData = {
        meta: {
          code: 200,
          message: `Data found.`,
        },
        data: data,
      }
      
      res.status(200).send(sendData);
    })
    .catch(err => {
      res.status(500).send(err)
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}

// GET HADIR MONTH
exports.getStatistik = async (req, res) => {
  try {
    const id = req.params.id;

    await db.sequelize.query(`SELECT COUNT(id_absensi) as hadir FROM absensis WHERE id_users = '${id}' AND MONTH(tanggal_absen) = MONTH(CURDATE())`, {
      type: QueryTypes.SELECT
    })
    .then((data) => {
      db.sequelize.query(`SELECT COUNT(id_absensi) as hadir FROM absensis WHERE id_users = '${id}' AND MONTH(tanggal_absen) = MONTH(CURDATE())`, {
        type: QueryTypes.SELECT
      })
      .then((data2) => {
        db.sequelize.query(`SELECT COUNT(id_survey) as survey FROM surveys WHERE id_users = '${id}' AND MONTH(created_at) = MONTH(CURDATE())`, {
          type: QueryTypes.SELECT
        })
        .then((data3) => {
          const sendData = {
            meta: {
              code: 200,
              message: `Data found.`,
            },
            hadir: data,
            tidak_hadir: data2,
            survey: data3
          }
          
          res.status(200).send(sendData);
        })
      })
    })
  } catch (error) {
    const dataSend = {
      meta: {
        code: 500,
        message: error,
      },
    }

    res.status(500).send(dataSend)
  }
}