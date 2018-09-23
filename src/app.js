const express = require('express');
import https from 'https';
var fs = require('fs');

const logger = require('morgan');
import passport from 'passport';
import session from 'express-session';
import { connect } from "./api/resources/config/db";
import { restRouter } from './api/resources';
import { configJWTStrategy } from './api/middlewares/passport-jwt';
import { configureGoogleStrategy } from './api/middlewares/passport-google';
import { devConfig } from './api/resources/config/env/development';

import User from './api/resources/usuario/usuario.model';
import { configureFacebookStrategy } from './api/middlewares/passport-facebook';

// var options = {
//     key: fs.readFileSync('keys/key.pem'),
//     cert: fs.readFileSync('keys/cert.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };


const app = express();
const PORT = 3000;

connect();

app.use(logger('dev'));

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: devConfig.secret,
    resave: false,
    saveUninitialized: true
}));


app.use(passport.initialize({ userProperty: 'currentUser' }));
app.use(passport.session());
configJWTStrategy();
configureGoogleStrategy();
configureFacebookStrategy();

// save user into session
// req.session.user = {userId}
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// extract the userId from session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});

// app.use(passport);
app.use('/api', restRouter);




app.get('/', function(req, res) {
    res.status(200).json({
        ok: true,
        mensaje: 'Bienvenido !!'
    });
});

// Cuando la autenticación falla redirecciona al login

// app.get('failure', (req, res) => {
//     return res.redirect('http://localhost:4200/login');
// });

// app.use((req, res, next) => {
//     const error = new Error('No encontrado');
//     error.message = 'Ruta incorrecta';
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     return res.json({
//         error: {
//             message: error.message,
//         },
//     });
// });
// var server = https.createServer(options, app);

app.listen(PORT, () => {
    console.log('Escuchando: ', PORT);
});