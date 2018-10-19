'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _isAdmin = require('../../middlewares/is-admin');

var _upload = require('./upload.controller');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileUpload = require('express-fileupload');

var uploadRouter = exports.uploadRouter = _express2.default.Router();

var adminPolicy = [_passport2.default.authenticate('jwt', { session: false }), _isAdmin.isAdmin];

uploadRouter.route('/:tipo/:id').put(fileUpload(), _upload2.default.update);
//# sourceMappingURL=upload.router.js.map