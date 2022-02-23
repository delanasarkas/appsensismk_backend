const express = require('express');
let app = express.Router();

app.get('/', function (req, res, next) {
    if(req.session.userLogin) {
        res.redirect('/')
    } else {
        // DECLARE DATA
        const data = {
            title: 'Login',
        }
        
        // RESPONSE
        res.render('auth/login', data);
    } 
});

app.get('/logout', function (req, res) {
    // LOGOUT
    req.session.destroy();

    res.redirect('/login');
});

module.exports = app