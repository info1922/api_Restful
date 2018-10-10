'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generaRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _genera = require('./genera.controller');

var _genera2 = _interopRequireDefault(_genera);

var _isAdmin = require('../../middlewares/is-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generaRouter = exports.generaRouter = _express2.default.Router();

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];

generaRouter.route('/:tipo').get(adminPolicy, _genera2.default.getMateriales);
//# sourceMappingURL=genera.router.js.map