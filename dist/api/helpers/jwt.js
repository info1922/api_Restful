'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _development = require('../resources/config/env/development');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    issue: function issue(payload, expiresIn) {
        return _jsonwebtoken2.default.sign(payload, _development.devConfig.secret, {
            expiresIn: expiresIn
        });
    }
};
//# sourceMappingURL=jwt.js.map