'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lugarListRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _lugar = require('./lugar.controller');

var _lugar2 = _interopRequireDefault(_lugar);

var _isAdmin = require('../../middlewares/is-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lugarListRouter = exports.lugarListRouter = _express2.default.Router();

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];
var userPolicy = _passport2.default.authenticate('jwt', { session: false });

lugarListRouter.route('/').post(adminPolicy, _lugar2.default.create).get(adminPolicy, _lugar2.default.findAll);

lugarListRouter.route('/:id').put(adminPolicy, _lugar2.default.update).delete(adminPolicy, _lugar2.default.delete).get(adminPolicy, _lugar2.default.findOne);
// .put(lugarController.update);
//# sourceMappingURL=lugar.router.js.map