'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buscarTodoRouter = exports.buscarListRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _buscar = require('./buscar.controller');

var _buscar2 = _interopRequireDefault(_buscar);

var _isAdmin = require('../../middlewares/is-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buscarListRouter = exports.buscarListRouter = _express2.default.Router();

var buscarTodoRouter = exports.buscarTodoRouter = _express2.default.Router();

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];

buscarListRouter.route('/:tabla/:buscar').get(adminPolicy, _buscar2.default.buscarColeccion);

buscarTodoRouter.route('/:todo').get(adminPolicy, _buscar2.default.buscarTodo);
//# sourceMappingURL=buscar.router.js.map