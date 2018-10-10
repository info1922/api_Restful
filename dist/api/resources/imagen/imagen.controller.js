'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());

/* jshint ignore:start */
exports.default = {
    getAll: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
            var tipo, idImagen, path;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            tipo = req.params.tipo;
                            idImagen = req.params.id;
                            path = './uploads/' + tipo + '/' + idImagen;


                            fs.exists(path, function (existe) {
                                if (!existe) {
                                    path = './assets/no-imagen.png';
                                }
                                res.sendfile(path);
                            });

                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', res.status(400).json({ ok: false, mensaje: 'Error al buscar la imagen', errors: _context.t0 }));

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 7]]);
        }));

        function getAll(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return getAll;
    }()
};
//# sourceMappingURL=imagen.controller.js.map