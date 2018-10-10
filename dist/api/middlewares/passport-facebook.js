'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configureFacebookStrategy = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _development = require('../resources/config/env/development');

var _usuario = require('../resources/usuario/usuario.model');

var _usuario2 = _interopRequireDefault(_usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* jshint ignore:start */
var configureFacebookStrategy = exports.configureFacebookStrategy = function configureFacebookStrategy() {

    _passport2.default.use(new _passportFacebook2.default.Strategy({
        clientID: _development.devConfig.facebook.app_id,
        clientSecret: _development.devConfig.facebook.app_secret,
        callbackURL: _development.devConfig.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'emails', 'name']
    }, function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accessToken, refreshToken, profile, done) {
            var user, newUser;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;


                            console.log('Nombre usuario facebook: ', profile.name.givenName);
                            console.log('Apellido usuario facebook: ', profile.name.familyName);
                            console.log('id: ', profile.id);
                            _context.next = 6;
                            return _usuario2.default.findOne({ 'facebook.id': profile.id });

                        case 6:
                            user = _context.sent;

                            if (!user) {
                                _context.next = 10;
                                break;
                            }

                            console.log('Este usuario de facebook ya existe');
                            return _context.abrupt('return', done(null, user));

                        case 10:
                            newUser = new _usuario2.default({});

                            newUser.nombre = profile.name.givenName;
                            newUser.apellido = profile.name.familyName;
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = accessToken;
                            newUser.facebook.displayName = profile.displayName;
                            newUser.facebook.email = profile.emails[0].value;

                            _context.next = 19;
                            return newUser.save();

                        case 19:
                            _context.next = 25;
                            break;

                        case 21:
                            _context.prev = 21;
                            _context.t0 = _context['catch'](0);

                            console.log('Algo salio mal, intentalo nuevamente', _context.t0);
                            return _context.abrupt('return', done(_context.t0));

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 21]]);
        }));

        return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }()));
};
//# sourceMappingURL=passport-facebook.js.map