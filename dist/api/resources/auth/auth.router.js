'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = exports.authRouter = _express2.default.Router();

authRouter.get('/google', _passport2.default.authenticate('google', {
    // scope: ['https://www.googleapis.com/auth/plus.login']
    scope: ['profile', 'email']
}));

authRouter.get('/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/failure' }), _auth2.default.sendJWTToken);

authRouter.get('/facebook', _passport2.default.authenticate('facebook', { scope: 'email' }));

authRouter.get('/facebook/callback', _passport2.default.authenticate('facebook', { failureRedirect: '/failure' }), _auth2.default.sendJWTToken);
//# sourceMappingURL=auth.router.js.map