'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configJWTStrategy = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _development = require('../resources/config/env/development');

var _usuario = require('../resources/usuario/usuario.model');

var _usuario2 = _interopRequireDefault(_usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configJWTStrategy = exports.configJWTStrategy = function configJWTStrategy() {

    var opts = {
        jwtFromRequest: _passportJwt2.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: _development.devConfig.secret
    };

    _passport2.default.use(new _passportJwt2.default.Strategy(opts, function (payload, done) {
        _usuario2.default.findOne({ _id: payload.id }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    }));
};
//# sourceMappingURL=passport-jwt.js.map