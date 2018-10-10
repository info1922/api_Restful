"use strict";

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _usuario = require("./usuario.service");

var _usuario2 = _interopRequireDefault(_usuario);

var _usuario3 = require("./usuario.model");

var _usuario4 = _interopRequireDefault(_usuario3);

var _jwt = require("../../helpers/jwt");

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* jshint ignore:start */
exports.default = {
            signup: function () {
                        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
                                    var _usuarioService$valid, value, error, encryptPass, existeUser, user;

                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                                while (1) {
                                                            switch (_context.prev = _context.next) {
                                                                        case 0:
                                                                                    _context.prev = 0;
                                                                                    _usuarioService$valid = _usuario2.default.validateSignup(req.body), value = _usuarioService$valid.value, error = _usuarioService$valid.error;

                                                                                    if (!error) {
                                                                                                _context.next = 4;
                                                                                                break;
                                                                                    }

                                                                                    return _context.abrupt("return", res.status(400).json(error));

                                                                        case 4:
                                                                                    encryptPass = _usuario2.default.encryptPassword(value.password);

                                                                                    // Validar si ya existe un usuario

                                                                                    _context.next = 7;
                                                                                    return _usuario4.default.findOne({ 'local.email': value.email });

                                                                        case 7:
                                                                                    existeUser = _context.sent;

                                                                                    if (!existeUser) {
                                                                                                _context.next = 10;
                                                                                                break;
                                                                                    }

                                                                                    return _context.abrupt("return", res.status(500).json({ mensaje: 'Ya existe una cuenta con este correo' }));

                                                                        case 10:
                                                                                    _context.next = 12;
                                                                                    return new _usuario4.default();

                                                                        case 12:
                                                                                    user = _context.sent;

                                                                                    user.local.email = value.email;
                                                                                    user.nombre = value.nombre;
                                                                                    user.apellido = value.apellido;
                                                                                    user.local.password = encryptPass;
                                                                                    user.role = value.role || _usuario3.USER_ROLE;

                                                                                    _context.next = 20;
                                                                                    return user.save();

                                                                        case 20:
                                                                                    return _context.abrupt("return", res.status(200).json({ ok: true, user: user }));

                                                                        case 23:
                                                                                    _context.prev = 23;
                                                                                    _context.t0 = _context["catch"](0);

                                                                                    console.log(_context.t0);
                                                                                    return _context.abrupt("return", res.status(500).json({ ok: false, error: _context.t0 }));

                                                                        case 27:
                                                                        case "end":
                                                                                    return _context.stop();
                                                            }
                                                }
                                    }, _callee, this, [[0, 23]]);
                        }));

                        function signup(_x, _x2) {
                                    return _ref.apply(this, arguments);
                        }

                        return signup;
            }(),
            login: function () {
                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
                                    var _usuarioService$valid2, value, error, user, autenticacion, token;

                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                            switch (_context2.prev = _context2.next) {
                                                                        case 0:
                                                                                    _context2.prev = 0;
                                                                                    _usuarioService$valid2 = _usuario2.default.validateLogin(req.body), value = _usuarioService$valid2.value, error = _usuarioService$valid2.error;

                                                                                    if (!error) {
                                                                                                _context2.next = 4;
                                                                                                break;
                                                                                    }

                                                                                    return _context2.abrupt("return", res.status(400).json(error));

                                                                        case 4:
                                                                                    _context2.next = 6;
                                                                                    return _usuario4.default.findOne({ 'local.email': value.email });

                                                                        case 6:
                                                                                    user = _context2.sent;

                                                                                    if (user) {
                                                                                                _context2.next = 9;
                                                                                                break;
                                                                                    }

                                                                                    return _context2.abrupt("return", res.status(401).json({ ok: false, err: 'Correo o contraseña incorrectos' }));

                                                                        case 9:
                                                                                    autenticacion = _usuario2.default.comparePassword(value.password, user.local.password);

                                                                                    // Si las contraseñas no coinciden

                                                                                    if (autenticacion) {
                                                                                                _context2.next = 12;
                                                                                                break;
                                                                                    }

                                                                                    return _context2.abrupt("return", res.status(401).json({ ok: false, err: 'Correo o contraseña incorrectos' }));

                                                                        case 12:
                                                                                    token = _jwt2.default.issue({ id: user._id }, '1d');
                                                                                    return _context2.abrupt("return", res.status(200).json({ user: user, token: token }));

                                                                        case 16:
                                                                                    _context2.prev = 16;
                                                                                    _context2.t0 = _context2["catch"](0);

                                                                                    console.log(_context2.t0);
                                                                                    return _context2.abrupt("return", res.status(500).json({ ok: false, error: _context2.t0 }));

                                                                        case 20:
                                                                        case "end":
                                                                                    return _context2.stop();
                                                            }
                                                }
                                    }, _callee2, this, [[0, 16]]);
                        }));

                        function login(_x3, _x4) {
                                    return _ref2.apply(this, arguments);
                        }

                        return login;
            }(),
            autenticacion: function autenticacion(req, res) {
                        return res.send(true);
            }
};
//# sourceMappingURL=usuario.controller.js.map