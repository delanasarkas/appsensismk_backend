const db = require("../models");
const Pelanggan = db.pelanggan;
const uuid = require('uuid');

// CREATE
exports.create = async (req, res) => {
  try {

    const dataVar = {
        id_pelanggan: uuid.v4(),
        alamat_pelanggan: req.body.alamat_pelanggan,
        email_pelanggan: req.body.email_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        nohp_pelanggan: req.body.nohp_pelanggan,
    };

    await Pelanggan.create(dataVar)
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
      alamat_pelanggan: req.body.alamat_pelanggan,
      email_pelanggan: req.body.email_pelanggan,
      nama_pelanggan: req.body.nama_pelanggan,
      nohp_pelanggan: req.body.nohp_pelanggan,
    };

    await Pelanggan.update(dataVar, {
      where: { id_pelanggan: id }
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

  Pelanggan.destroy({
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