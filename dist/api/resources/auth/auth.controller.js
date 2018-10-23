'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _development = require('./../config/env/development');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

var expires = moment().add(30, 'days').valueOf();

exports.default = {
    sendJWTToken: function sendJWTToken(req, res) {
        console.log(req.currentUser.id);
        var token = _jsonwebtoken2.default.sign({ id: req.currentUser.id }, _development.devConfig.secret, { expiresIn: expires });

        // return res.json({ ok: true, token }); // Jwt token
        res.redirect(_development.devConfig.frontendURL + '/panel/?token=' + token);
    },
    authenticate: function authenticate(req, res) {
        return res.send(true);
    },
    renuevaToken: function renuevaToken(req, res) {
        var token = _jsonwebtoken2.default.sign({ id: req.currentUser }, _development.devConfig.secret, { expiresIn: '5d' });
        res.status(200).json({
            ok: true,
            token: token
        });
    }
};
//# sourceMappingURL=auth.controller.js.map