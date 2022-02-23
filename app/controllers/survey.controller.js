const db = require("../models");
const Survey = db.survey;
const uuid = require('uuid');

// CREATE
exports.create = async (req, res) => {
  try {

    const dataVar = {
        id_survey: uuid.v4(),
        id_users: req.body.id_users,
        id_pemesanan: req.body.id_pemesanan,
        status_survey: 'proses',
    };

    await Survey.create(dataVar)
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
      id_users: req.body.id_users
    };

    await Survey.update(dataVar, {
      where: { id_survey: id }
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

  Survey.destroy({
    where: { id_survey: id }
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