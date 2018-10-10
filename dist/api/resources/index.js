'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _material = require('./material');

var _usuario = require('./usuario/usuario.router');

var _auth = require('./auth');

var _lugar = require('./lugar');

var _upload = require('./upload/upload.router');

var _genera = require('./gereraPDF/genera.router');

var _imagen = require('./imagen/imagen.router');

var _buscar = require('./buscar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restRouter = exports.restRouter = _express2.default.Router();
restRouter.use('/material', _material.materialRouter);
restRouter.use('/users', _usuario.userRouter);
restRouter.use('/lugar', _lugar.lugarListRouter);
restRouter.use('/upload', _upload.uploadRouter);
restRouter.use('/pdf', _genera.generaRouter);
restRouter.use('/buscar', _buscar.buscarListRouter);
restRouter.use('/todo', _buscar.buscarTodoRouter);
restRouter.use('/imagen', _imagen.imagenRouter);
restRouter.use('/auth', _auth.authRouter);
//# sourceMappingURL=index.js.map