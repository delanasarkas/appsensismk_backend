const db = require("../models");
const Pembayaran = db.pembayaran;
const Tagihan = db.tagihan;
const Pemesanan = db.pemesanan;
const uuid = require('uuid');

// CREATE
exports.create = async (req, res) => {
  try {
    const dataVar = {
        id_pembayaran: uuid.v4(),
        id_tagihan: req.body.id_tagihan,
        jenis_pembayaran: req.body.jenis_pembayaran,
    };

    await Pembayaran.create(dataVar)
    .then((data) => {
        Tagihan.update({
          status_tagihan: 'lunas'
        }, {
          where: { id_tagihan: req.body.id_tagihan }
        })
        .then((data2) => {
          Pemesanan.update({
            status_pemesanan: 'selesai'
          }, {
            where: { no_order: req.body.nomor_order }
          })
          .then((data3) => {
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
        })
        .catch(err => {
          res.status(500).send(err)
        })
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

  Pembayaran.destroy({
    where: { id_pelanggan: id }
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