"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _lugar2 = require("./lugar.service");

var _lugar3 = _interopRequireDefault(_lugar2);

var _lugar4 = require("./lugar.model");

var _lugar5 = _interopRequireDefault(_lugar4);

var _material = require("../material/material.model");

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

/* jshint ignore:start */
exports.default = {
    create: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
            var _lugarService$validat, value, error, lugar;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _lugarService$validat = _lugar3.default.validateBody(req.body), value = _lugarService$validat.value, error = _lugarService$validat.error;

                            if (!(error && error.details)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt("return", res.status(500).json({ error: error }));

                        case 4:
                            _context.next = 6;
                            return _lugar5.default.create((0, _assign2.default)({}, value, { usuario: req.currentUser._id }));

                        case 6:
                            lugar = _context.sent;
                            return _context.abrupt("return", res.status(200).json({ ok: true, lugar: lugar }));

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context["catch"](0);
                            return _context.abrupt("return", res.status(500).json({ error: _context.t0 }));

                        case 13:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 10]]);
        }));

        function create(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return create;
    }(),
    findAll: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
            var lugarlist;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _lugar5.default.find().populate('materiales').populate('usuario', 'nombre apellido local google facebook');

                        case 3:
                            lugarlist = _context2.sent;
                            return _context2.abrupt("return", res.status(200).json({ ok: true, lugarlist: lugarlist }));

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);
                            return _context2.abrupt("return", res.status(500).json({ error: _context2.t0 }));

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 7]]);
        }));

        function findAll(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return findAll;
    }(),
    findOne: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
            var id, lugar;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            id = req.params.id;
                            _context3.next = 4;
                            return _lugar5.default.findById(id).populate('usuario').populate('materiales');

                        case 4:
                            lugar = _context3.sent;

                            if (lugar) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt("return", res.status(404).json({ ok: false, mensaje: 'No se encontro el lugar' }));

                        case 7:
                            return _context3.abrupt("return", res.status(200).json({ ok: true, lugar: lugar }));

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](0);
                            return _context3.abrupt("return", res.status(500).json({ ok: false, error: _context3.t0 }));

                        case 13:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[0, 10]]);
        }));

        function findOne(_x5, _x6) {
            return _ref3.apply(this, arguments);
        }

        return findOne;
    }(),
    update: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
            var id, body, user, lug1, mat, mater, lugar, _lugar;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            id = req.params.id;
                            body = req.body;
                            user = req.currentUser._id;
                            lug1 = {
                                nombre: body.nombre,
                                direccion: body.direccion,
                                usuario: req.currentUser._id
                            };
                            mat = body.materiales;
                            // console.log('Lugares para agregar: ', mat.length);


                            _context4.next = 8;
                            return _material2.default.find({ _id: mat }).where('asignado', false);

                        case 8:
                            mater = _context4.sent;

                            if (!(mater.length <= 0)) {
                                _context4.next = 18;
                                break;
                            }

                            // console.log('Id del delugar: ', req.params.id);
                            console.log('No hay materiales');
                            _context4.next = 13;
                            return _lugar5.default.findOneAndUpdate({ _id: req.params.id }, lug1, { new: true });

                        case 13:
                            lugar = _context4.sent;

                            console.log(lugar);
                            return _context4.abrupt("return", res.status(200).json({ ok: true, mensaje: 'Lugar actualizado m=0', lugar: lugar }));

                        case 18:
                            _context4.next = 20;
                            return _lugar5.default.findOneAndUpdate(id, { $set: { 'nombre': req.body.nombre }, $push: { 'materiales': req.body.materiales } }, { new: true }).populate('materiales');

                        case 20:
                            _lugar = _context4.sent;


                            // console.log('Lugar actualizado: ', lugar);

                            // Actualizamos los materiales con asignado = true

                            mater.map(function (d) {

                                // Revisar por que remplaza el valor anterior por el nuevo
                                _material2.default.findById(d._id).exec(function (err, material) {
                                    if (err) {
                                        throw 'Error al actualizar material';
                                    }
                                    if (!material) {
                                        throw 'No hay materiales en el arreglo';
                                    }
                                    console.log('Materiales agregados: ', material);

                                    if (material.asignado === false) {
                                        material.asignado = true;
                                        material.lugar = req.params.id;
                                        material.usuario = req.currentUser._id;

                                        material.save(function (err, materialUpdate) {
                                            if (err) {
                                                throw err;
                                            }
                                            console.log('Materiales actalizados: ', materialUpdate);
                                        });
                                    } else {
                                        console.log('Este material ya esta asignado', material.title);
                                    }
                                });
                            });

                            return _context4.abrupt("return", res.status(200).json({ mensaje: 'Lugar actualizado m>0', lugar: _lugar }));

                        case 23:
                            _context4.next = 28;
                            break;

                        case 25:
                            _context4.prev = 25;
                            _context4.t0 = _context4["catch"](0);
                            return _context4.abrupt("return", res.status(500).json({ error: { message: 'Error al actualiza el lugar' }, algo: _context4.t0 }));

                        case 28:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[0, 25]]);
        }));

        function update(_x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return update;
    }(),
    delete: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
            var id, lugar, vacio, lug, pathViejo, mbuscar;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            id = req.params.id;
                            _context5.next = 4;
                            return _lugar5.default.find({ _id: id });

                        case 4:
                            lugar = _context5.sent;
                            vacio = void 0;


                            console.log('Lugar a buscar: ', lugar);

                            _context5.next = 9;
                            return _lugar5.default.findById({ _id: id });

                        case 9:
                            lug = _context5.sent;

                            if (lugar) {
                                _context5.next = 12;
                                break;
                            }

                            return _context5.abrupt("return", res.status(400).json({ ok: false, mensaje: 'Lugar no encontrado' }));

                        case 12:
                            if (!(lugar === null)) {
                                _context5.next = 14;
                                break;
                            }

                            return _context5.abrupt("return", res.status(400).json({ ok: false, mensaje: 'Lugar no encontrado' }));

                        case 14:

                            // Tiene materiales en el arreglo ?? 
                            lugar.map(function (d) {
                                vacio = d.materiales;
                            });

                            if (!(vacio.length === 0)) {
                                _context5.next = 22;
                                break;
                            }

                            console.log('No tiene materiales');
                            if (lug.img) {
                                // console.log('Tiene una imagen ---------');
                                pathViejo = './uploads/lugares/' + lug.img;
                                // console.log('Dirección del archivo antes de eliminar lugar', pathViejo);

                                fs.unlinkSync(pathViejo);
                                // console.log('Se elimino la imagen');
                            }

                            lug.remove();
                            return _context5.abrupt("return", res.status(200).json({ ok: true, mensaje: 'Lugar eliminado', lugar: lugar }));

                        case 22:
                            console.log('Contiene materiales', vacio.length);
                            mbuscar = void 0;
                            // Recorremos el arreglo del lugar

                            lugar.map(function (m) {
                                mbuscar = m.materiales;
                                console.log(mbuscar);
                                // Recorremos el arreglo de materiales de un lugar
                                mbuscar.map(function (b) {
                                    // Buscamos los materiales dentro del arreglo
                                    _material2.default.findByIdAndUpdate({ _id: b }, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': lugar } }).exec(function (err, material) {
                                        if (err) {
                                            return 'Error';
                                        }
                                        if (!material) {
                                            throw 'Materiales nulos';
                                        }
                                    });
                                    console.log(b);
                                });
                            });

                        case 25:

                            lug.remove();

                            return _context5.abrupt("return", res.status(200).json({ ok: true, mensaje: 'Lugar eliminado', lugar: lugar }));

                        case 29:
                            _context5.prev = 29;
                            _context5.t0 = _context5["catch"](0);
                            return _context5.abrupt("return", res.status(500).json({ ok: false, mensaje: 'Error en la petición' }));

                        case 32:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[0, 29]]);
        }));

        function _delete(_x9, _x10) {
            return _ref5.apply(this, arguments);
        }

        return _delete;
    }()
};
//# sourceMappingURL=lugar.controller.js.map