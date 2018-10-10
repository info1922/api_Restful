'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _usuario = require('./usuario.controller');

var _usuario2 = _interopRequireDefault(_usuario);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = exports.userRouter = _express2.default.Router();
userRouter.post('/signup', _usuario2.default.signup);
userRouter.post('/login', _usuario2.default.login);
userRouter.get('/me', _passport2.default.authenticate('jwt', { session: false }), _usuario2.default.autenticacion);
//# sourceMappingURL=usuario.router.js.map