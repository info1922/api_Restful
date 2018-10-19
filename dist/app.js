'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _db = require('./api/resources/config/db');

var _resources = require('./api/resources');

var _passportJwt = require('./api/middlewares/passport-jwt');

var _passportGoogle = require('./api/middlewares/passport-google');

var _development = require('./api/resources/config/env/development');

var _usuario = require('./api/resources/usuario/usuario.model');

var _usuario2 = _interopRequireDefault(_usuario);

var _passportFacebook = require('./api/middlewares/passport-facebook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var fs = require('fs');

var logger = require('morgan');


// var options = {
//     key: fs.readFileSync('keys/key.pem'),
//     cert: fs.readFileSync('keys/cert.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };


var app = express();
var PORT = 3000;

(0, _db.connect)();

app.use(logger('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((0, _cors2.default)());

app.use((0, _expressSession2.default)({
    secret: _development.devConfig.secret,
    resave: false,
    saveUninitialized: true
}));

app.use(_passport2.default.initialize({ userProperty: 'currentUser' }));
app.use(_passport2.default.session());
(0, _passportJwt.configJWTStrategy)();
(0, _passportGoogle.configureGoogleStrategy)();
(0, _passportFacebook.configureFacebookStrategy)();

// save user into session
// req.session.user = {userId}
_passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
});

// extract the userId from session
_passport2.default.deserializeUser(function (id, done) {
    _usuario2.default.findById(id, function (err, user) {
        done(null, user);
    });
});

// app.use(passport);
app.use('/api', _resources.restRouter);

app.get('/', function (req, res) {
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

app.listen(PORT, function () {
    console.log('Escuchando: ', PORT);
});
//# sourceMappingURL=app.js.map