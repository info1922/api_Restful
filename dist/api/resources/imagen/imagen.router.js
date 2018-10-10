'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imagenRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imagen = require('./imagen.controller');

var _imagen2 = _interopRequireDefault(_imagen);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _isAdmin = require('../../middlewares/is-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileUpload = require('express-fileupload');

var imagenRouter = exports.imagenRouter = _express2.default.Router();

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];

imagenRouter.route('/:tipo/:id').get(fileUpload(), _imagen2.default.getAll);
//# sourceMappingURL=imagen.router.js.map