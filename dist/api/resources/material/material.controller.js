'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _material = require('./material.model');

var _material2 = _interopRequireDefault(_material);

var _lugar = require('../lugar/lugar.model');

var _lugar2 = _interopRequireDefault(_lugar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');


/* jshint ignore:start */
exports.default = {
    create: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
            var body, material, existLugar, mater, _mater, lug;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;


                            // Guardar el material con el id del lugar para referencias y cambiar
                            // asignado = true
                            body = req.body;
                            // const user = req.currentUser._id;

                            material = new _material2.default({
                                title: body.title,
                                url: body.url,
                                asignado: body.asignado,
                                cantidad: body.cantidad,
                                img: body.img,
                                lugar: body.lugar,
                                usuario: req.currentUser._id
                            });
                            existLugar = material.lugar;

                            // Verifica si un material esta asignado a un lugar

                            if (!(existLugar === undefined)) {
                                _context.next = 12;
                                break;
                            }

                            // console.log('Esta vacio');
                            material.asignado = false;
                            _context.next = 8;
                            return material.save();

                        case 8:
                            mater = _context.sent;
                            return _context.abrupt('return', res.status(200).json({ ok: true, mater: mater }));

                        case 12:
                            // console.log('Tiene dato');
                            material.asignado = true;
                            _context.next = 15;
                            return material.save();

                        case 15:
                            _mater = _context.sent;
                            _context.next = 18;
                            return _lugar2.default.findByIdAndUpdate({ _id: body.lugar }, { $push: { 'materiales': _mater._id } }, { new: true });

                        case 18:
                            lug = _context.sent;
                            return _context.abrupt('return', res.status(200).json({ ok: true, mater: _mater }));

                        case 20:
                            _context.next = 25;
                            break;

                        case 22:
                            _context.prev = 22;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', res.status(500).json({ ok: false, msg: 'Error al guardar el material', error: _context.t0 }));

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 22]]);
        }));

        function create(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return create;
    }(),
    findAll: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
            var _req$query, page, perPage, options, materiales;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _req$query = req.query, page = _req$query.page, perPage = _req$query.perPage;
                            options = {
                                page: parseInt(page, 10) || 1,
                                limit: parseInt(perPage, 10) || 5,
                                populate: { path: 'usuario', select: 'nombre apellido' }
                            };
                            _context2.next = 5;
                            return _material2.default.paginate({}, options);

                        case 5:
                            materiales = _context2.sent;
                            return _context2.abrupt('return', res.status(200).json(materiales));

                        case 9:
                            _context2.prev = 9;
                            _context2.t0 = _context2['catch'](0);
                            return _context2.abrupt('return', res.status(500).json({ ok: false, error: _context2.t0 }));

                        case 12:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 9]]);
        }));

        function findAll(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return findAll;
    }(),
    findOne: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
            var id, material;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            id = req.params.id;
                            _context3.next = 4;
                            return _material2.default.findById(id).populate('usuario', 'nombre apellido');

                        case 4:
                            material = _context3.sent;

                            if (material) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt('return', res.status(404).json({ ok: false, mensaje: 'No se encontro el material' }));

                        case 7:
                            return _context3.abrupt('return', res.status(200).json({ ok: true, material: material }));

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3['catch'](0);
                            return _context3.abrupt('return', res.status(500).json({ ok: false, error: _context3.t0 }));

                        case 13:
                        case 'end':
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


    // Revisar esta función
    delete: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
            var id, material, lugarExiste, materialId, lug, materialD, path, nombreImagen;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            id = req.params.id;

                            // Buscamos el lugar

                            _context4.next = 4;
                            return _material2.default.findById({ _id: id }).populate('lugar');

                        case 4:
                            material = _context4.sent;
                            lugarExiste = material.lugar;
                            materialId = material._id;
                            lug = void 0;
                            materialD = void 0;
                            path = void 0;
                            nombreImagen = material.img;

                            // Asignar el nombre de la imagen

                            if (material) {
                                _context4.next = 13;
                                break;
                            }

                            return _context4.abrupt('return', res.status(404).json({ ok: false, mensaje: 'No se encontro el material' }));

                        case 13:
                            if (!lugarExiste) {
                                _context4.next = 23;
                                break;
                            }

                            _context4.next = 16;
                            return _lugar2.default.findByIdAndUpdate({ _id: lugarExiste._id }, { $pull: { 'materiales': materialId } }, { new: true });

                        case 16:
                            lug = _context4.sent;

                            if (nombreImagen) {
                                // console.log('2.- Campo imagen existe');
                                path = './uploads/materiales/' + nombreImagen;
                                fs.exists(path, function (existe) {
                                    if (existe) {
                                        // console.log('3.- Existe imagen');
                                        fs.unlinkSync(path);
                                    }
                                    // console.log('2.- No existe la imagen');
                                });
                            }
                            //Eliminar material aquí
                            _context4.next = 20;
                            return _material2.default.findByIdAndRemove({ _id: id });

                        case 20:
                            materialD = _context4.sent;
                            _context4.next = 27;
                            break;

                        case 23:
                            // console.log('no existe lugar');
                            if (nombreImagen) {
                                // console.log('2.- Campo imagen existe');
                                path = './uploads/materiales/' + nombreImagen;
                                fs.exists(path, function (existe) {
                                    if (existe) {
                                        // console.log('3.- Existe imagen');
                                        fs.unlinkSync(path);
                                    }
                                });
                            }
                            //Eliminar material aquí
                            _context4.next = 26;
                            return _material2.default.findByIdAndRemove({ _id: id });

                        case 26:
                            materialD = _context4.sent;

                        case 27:
                            return _context4.abrupt('return', res.status(200).json({ ok: true, mensaje: 'Material eliminado correctamente', materialD: materialD }));

                        case 30:
                            _context4.prev = 30;
                            _context4.t0 = _context4['catch'](0);
                            return _context4.abrupt('return', res.status(500).json({ ok: false, error: _context4.t0 }));

                        case 33:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[0, 30]]);
        }));

        function _delete(_x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return _delete;
    }(),
    update: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
            var id, body, mater, user, des, existLugar, mafind, matActual2, _nuevoOrigen, _matActual2, viejoOrigen, matActual1, nuevoOrigen, _matActual, lugarExiste;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            id = req.params.id;
                            body = req.body;
                            //

                            mater = {
                                title: body.title,
                                url: body.url,
                                asignado: body.asignado,
                                cantidad: body.cantidad,
                                lugar: body.lugar,
                                desvincular: body.desvincular,
                                usuario: req.currentUser._id
                            };
                            //

                            user = req.currentUser._id;
                            des = body.desvincular;
                            existLugar = mater.lugar;
                            _context5.next = 9;
                            return _material2.default.findById(id).populate('lugar');

                        case 9:
                            mafind = _context5.sent;

                            if (!(mater.lugar === undefined)) {
                                _context5.next = 18;
                                break;
                            }

                            console.log(mater.title, mater.url);
                            // const mafind = await Material.findById(id).populate('lugar');
                            _context5.next = 14;
                            return _material2.default.findByIdAndUpdate(id, mater, { new: true });

                        case 14:
                            _context5.next = 16;
                            return _material2.default.findByIdAndUpdate(id, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': mater.lugar } }, { new: true });

                        case 16:
                            matActual2 = _context5.sent;
                            return _context5.abrupt('return', res.status(200).json({ ok: true, matActual2: matActual2 }));

                        case 18:
                            if (!(mater.lugar !== undefined)) {
                                _context5.next = 47;
                                break;
                            }

                            if (!(mafind.lugar === undefined)) {
                                _context5.next = 29;
                                break;
                            }

                            _context5.next = 22;
                            return _lugar2.default.findByIdAndUpdate({ _id: mater.lugar }, { $push: { 'materiales': mafind._id } }, { new: true });

                        case 22:
                            _nuevoOrigen = _context5.sent;

                            mater.asignado = true;
                            mater.desvincular = false;
                            _context5.next = 27;
                            return _material2.default.findByIdAndUpdate(id, mater, { new: true });

                        case 27:
                            _matActual2 = _context5.sent;
                            return _context5.abrupt('return', res.status(200).json({ ok: true, matActual2: _matActual2 }));

                        case 29:
                            _context5.next = 31;
                            return _lugar2.default.findByIdAndUpdate({ _id: mafind.lugar._id }, { $pull: { 'materiales': mafind._id } }, { new: true });

                        case 31:
                            viejoOrigen = _context5.sent;
                            _context5.next = 34;
                            return _material2.default.findByIdAndUpdate(id, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': mater.lugar } }, { new: true });

                        case 34:
                            matActual1 = _context5.sent;
                            _context5.next = 37;
                            return _lugar2.default.findByIdAndUpdate({ _id: mater.lugar }, { $push: { 'materiales': mafind._id } }, { new: true });

                        case 37:
                            nuevoOrigen = _context5.sent;

                            mater.asignado = true;
                            mater.desvincular = false;
                            _context5.next = 42;
                            return _material2.default.findByIdAndUpdate(id, mater, { new: true });

                        case 42:
                            _matActual = _context5.sent;
                            _context5.next = 45;
                            return _lugar2.default.findById({ _id: mater.lugar });

                        case 45:
                            lugarExiste = _context5.sent;
                            return _context5.abrupt('return', res.status(200).json({ ok: true, matActual2: _matActual }));

                        case 47:
                            _context5.next = 52;
                            break;

                        case 49:
                            _context5.prev = 49;
                            _context5.t0 = _context5['catch'](0);
                            return _context5.abrupt('return', res.status(500).json({ ok: false, error: { message: 'Error al actualizar el material' }, algo: _context5.t0 }));

                        case 52:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[0, 49]]);
        }));

        function update(_x9, _x10) {
            return _ref5.apply(this, arguments);
        }

        return update;
    }()
};
//# sourceMappingURL=material.controller.js.map