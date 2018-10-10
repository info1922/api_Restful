'use strict';

Object.defineProperty(exports, "__esModule", {
                value: true
});
exports.configureGoogleStrategy = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _development = require('../resources/config/env/development');

var _usuario = require('../resources/usuario/usuario.model');

var _usuario2 = _interopRequireDefault(_usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
/* jshint ignore:start */
var configureGoogleStrategy = exports.configureGoogleStrategy = function configureGoogleStrategy() {

                _passport2.default.use(new _passportGoogleOauth2.default.OAuth2Strategy({
                                clientID: _development.devConfig.google.clientId,
                                clientSecret: _development.devConfig.google.clientSecret,
                                callbackURL: _development.devConfig.google.callbackURL
                }, function () {
                                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token, tokenSecret, profile, done) {
                                                var user, newUser;
                                                return _regenerator2.default.wrap(function _callee$(_context) {
                                                                while (1) {
                                                                                switch (_context.prev = _context.next) {
                                                                                                case 0:
                                                                                                                _context.prev = 0;
                                                                                                                _context.next = 3;
                                                                                                                return _usuario2.default.findOne({ 'google.id': profile.id });

                                                                                                case 3:
                                                                                                                user = _context.sent;

                                                                                                                if (!user) {
                                                                                                                                _context.next = 7;
                                                                                                                                break;
                                                                                                                }

                                                                                                                console.log('Este usuario ya existe');
                                                                                                                return _context.abrupt('return', done(null, user));

                                                                                                case 7:
                                                                                                                newUser = new _usuario2.default({});


                                                                                                                newUser.nombre = profile.name.givenName;
                                                                                                                newUser.apellido = profile.name.familyName;
                                                                                                                newUser.google.id = profile.id;
                                                                                                                newUser.google.token = token;
                                                                                                                newUser.google.displayName = profile.displayName;
                                                                                                                newUser.google.email = profile.emails[0].value;

                                                                                                                _context.next = 16;
                                                                                                                return newUser.save();

                                                                                                case 16:
                                                                                                                return _context.abrupt('return', done(null, newUser));

                                                                                                case 19:
                                                                                                                _context.prev = 19;
                                                                                                                _context.t0 = _context['catch'](0);

                                                                                                                console.log(_context.t0);
                                                                                                                return _context.abrupt('return', done(_context.t0));

                                                                                                case 23:
                                                                                                case 'end':
                                                                                                                return _context.stop();
                                                                                }
                                                                }
                                                }, _callee, undefined, [[0, 19]]);
                                }));

                                return function (_x, _x2, _x3, _x4) {
                                                return _ref.apply(this, arguments);
                                };
                }()));
};
//# sourceMappingURL=passport-google.js.map