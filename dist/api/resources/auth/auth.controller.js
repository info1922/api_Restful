'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _development = require('./../config/env/development');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    sendJWTToken: function sendJWTToken(req, res) {
        console.log(req.currentUser.id);
        var token = _jsonwebtoken2.default.sign({ id: req.currentUser.id }, _development.devConfig.secret, { expiresIn: '1d' });

        return res.json({ ok: true, token: token }); // Jwt token
        // res.redirect(`${devConfig.frontendURL}/panel/?token=${token}`);
    }
};
//# sourceMappingURL=auth.controller.js.map