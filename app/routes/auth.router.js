const express = require('express');
let app = express.Router();
const auth = require("../controllers/auth.controller.js");

// API
app.post('/login', auth.login);
app.post('/register', auth.register);
app.put('/update/:id', auth.update);
app.delete('/delete/:id', auth.delete);

module.exports = app