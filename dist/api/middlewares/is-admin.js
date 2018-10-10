"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAdmin = undefined;

var _usuario = require("../resources/usuario/usuario.model");

var isAdmin = exports.isAdmin = function isAdmin(req, res, next) {
    if (req.currentUser.role !== 2) {
        return res.json({ err: 'Acceso no autorizado, no eres un administrador' });
    }
    next();
};
//# sourceMappingURL=is-admin.js.map