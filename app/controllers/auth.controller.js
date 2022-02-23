const db = require("../models");
const Users = db.users;
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// CREATE DATA
exports.login = async (req, res) => {
  try {
    await Users.findOne({
      where: {
        email_user: req.body.email
      }
    }).then(async (data) => {
      // IF EXIST
      if(data) {
        if(data.role !== 'karyawan') {
          // SESSION
          req.session.userLogin = data;
        }

        // CEK PASSWORD
        const passwordVal = req.body.password;
        
        if(await bcrypt.compare(passwordVal, data.password)) {
          const dataSend = {
            meta: {
              code: 200,
              message: `Login berhasil.`,
            },
            data: data
          }
  
          res.status(200).send(dataSend)
        } else {
          const dataSend = {
            meta: {
              code: 500,
              message: `Password yang dimasukkan tidak valid!`,
            },
          }
  
          res.status(500).send(dataSend)
        }
      } else {
        const dataSend = {
          meta: {
            code: 500,
            message: `Email tidak terdaftar!`,
          },
          data: req.body
        }

        res.status(500).send(dataSend)
      }
    })
    .catch(err => {
      res.send(err)
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

exports.register = async (req, res) => {
  try {
    await Users.findOne(
      {
        where: {
          email_user: req.body.email_karyawan
        }
      }
    ).then(async (data) => {
      if(!data) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password_karyawan, salt);
    
        const dataVar = {
          id_users: uuid.v4(),
          email_user: req.body.email_karyawan,
          nama_user: req.body.nama_karyawan,
          nohp_user: req.body.nohp_karyawan,
          password: hashPassword,
          role: 'karyawan',
          status: 'aktif',
        };
    
        await Users.create(dataVar)
        .then((data) => {
          const sendData = {
            meta: {
              code: 201,
              message: `Registrasi berhasil.`,
            },
            data: data,
          }
          
          res.status(201).send(sendData);
        })
        .catch(err => {
          res.send(err)
        })
      } else {
        const dataSend = {
          meta: {
            code: 500,
            message: 'Email sudah terdaftar!',
          },
        }
    
        res.status(500).send(dataSend)
      }
    })
    .catch(err => {
      res.send(err)
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
    const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password_karyawan, salt);

    const dataVar = req.body.password_karyawan ? {
      nama_user: req.body.nama_karyawan,
      email_user: req.body.email_karyawan,
      nohp_user: req.body.nohp_karyawan,
      password: hashPassword,
    } : {
      nama_user: req.body.nama_karyawan,
      email_user: req.body.email_karyawan,
      nohp_user: req.body.nohp_karyawan,
    };

    await Users.update(dataVar, {
      where: { id_users: id }
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

  Users.destroy({
    where: { id_users: id }
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