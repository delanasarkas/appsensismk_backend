const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require("body-parser");
const session = require("express-session")

// ENV
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// STATIC FILES
app.use(express.static(__dirname + '/public'));

// CORS & BODY PARSER API
const corsOptions = {
    origin: '*'
};
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

// SESSION
app.use(session({
    resave: false,
    secret: 'secret-key',
    saveUninitialized: false,
}));

// DATABASE CONFIG
const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// EJS VIEW
app.set(
    'views', 
    './app/views'
);
app.set(
    'view engine',
    'ejs'
);

// ROUTE PAGE
const dashboardPage = require('./app/routes/dashboard.router');
const authPage = require('./app/routes/authpage.router');
const auth = require('./app/routes/auth.router');
const apis = require('./app/routes/apis.router');

// DECLARE PAGE
app.use('/', dashboardPage)
app.use('/login', authPage)
app.use('/api/auth', auth)
app.use('/api', apis)

app.listen(PORT, () => {
    console.log(`server running on port ${process.env.URI}`+ PORT)
});