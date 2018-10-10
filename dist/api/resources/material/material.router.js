'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.materialRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _material = require('./material.controller');

var _material2 = _interopRequireDefault(_material);

var _isAdmin = require('../../middlewares/is-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var materialRouter = exports.materialRouter = _express2.default.Router();

// USER_ROLE solo puede ver los registros.
// ADMIN_ROLE puede eliminar, editar y registrar.

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];
var userPolicy = _passport2.default.authenticate('jwt', { session: false });

materialRouter.route('/').post(adminPolicy, _material2.default.create).get(adminPolicy, _material2.default.findAll);

materialRouter.route('/:id').get(adminPolicy, _material2.default.findOne).delete(adminPolicy, _material2.default.delete).put(adminPolicy, _material2.default.update);
//# sourceMappingURL=material.router.js.map