const db = require("../models");
const Pemesanan = db.pemesanan;
const uuid = require('uuid');
const time = require('node-get-time');
// MOMENT
const moment= require('moment');

// CREATE
exports.create = async (req, res) => {
  try {
    let orderGenerate = `ORDER-${moment(req.body.tgl_pemesanan).format('DDMMYYYY')}${(time.now()).replace(/:/g, '')}`;

    const dataVar = {
        id_pemesanan: uuid.v4(),
        id_pelanggan: req.body.id_pelanggan,
        no_order: orderGenerate,
        deskripsi_pemesanan: req.body.deskripsi_pemesanan,
        tgl_pemesanan: `${moment(req.body.tgl_pemesanan).format('YYYY-MM-DD')} ${req.body.waktu_pemesanan}`,
        status_pemesanan: req.body.status_pemesanan,
    };

    await Pemesanan.create(dataVar)
    .then((data) => {
        const sendData = {
            meta: {
                code: 201,
                message: `Tambah Data berhasil.`,
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

// UPDATE
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const dataVar = {
      id_pelanggan: req.body.id_pelanggan,
      deskripsi_pemesanan: req.body.deskripsi_pemesanan,
      tgl_pemesanan: `${moment(req.body.tgl_pemesanan).format('YYYY-MM-DD')} ${req.body.waktu_pemesanan}`,
    };

    await Pemesanan.update(dataVar, {
      where: { id_pemesanan: id }
    })
    .then((data) => {
        const sendData = {
            meta: {
                code: 201,
                message: `Ubah Data berhasil.`,
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

// DELETE
exports.delete = (req, res) => {
  const id = req.params.id;

  Pemesanan.destroy({
    where: { id_pemesanan: id }
  })
  .then(num => {
    if (num == 1) {
      const sendData = {
        meta: {
          code: 200,
          message: `Data was deleted.`,
        }
      }

      res.send(sendData);
    } else {
      const sendData = {
        meta: {
          code: 400,
          message: `Error delete data.`,
        }
      }

      res.send(sendData);
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete data"
    });
  });
};