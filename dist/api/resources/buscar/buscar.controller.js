'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _material = require('../material/material.model');

var _material2 = _interopRequireDefault(_material);

var _lugar = require('../lugar/lugar.model');

var _lugar2 = _interopRequireDefault(_lugar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    buscarColeccion: function buscarColeccion(req, res) {
        var buscar = req.params.buscar;
        var tabla = req.params.tabla;
        var regex = new RegExp(buscar, 'i');

        var promesa = void 0;

        switch (tabla) {
            case 'usuarios':
                promesa = buscarUsuarios(buscar, regex);
                break;

            case 'materiales':
                promesa = buscarMateriales(buscar, regex);
                break;

            case 'lugares':
                promesa = buscarLugares(buscar, regex);
                break;

            default:
                return res.status(400).json({ ok: false, mensaje: 'Colección no valida' });
        }

        promesa.then(function (data) {
            res.status(200).json((0, _defineProperty3.default)({
                ok: true
            }, tabla, data));
        });

        // res.send('Buscar por colección');
    },
    buscarTodo: function buscarTodo(req, res, next) {
        var todo = req.params.todo;
        var regex = new RegExp(todo, 'i');

        _promise2.default.all([buscarLugares(todo, regex), buscarMateriales(todo, regex)]).then(function (respuestas) {
            res.status(200).json({
                ok: true,
                lugares: respuestas[0],
                materiales: respuestas[1]
            });
        });
    }
};


function buscarLugares(buscar, regex) {
    return new _promise2.default(function (resolve, reject) {
        _lugar2.default.find({ nombre: regex }).exec(function (err, lugares) {
            if (err) {
                reject('Error al cargar los lugares', err);
            } else {
                resolve(lugares);
            }
        });
    });
}

function buscarMateriales(buscar, regex) {
    return new _promise2.default(function (resolve, reject) {
        _material2.default.find({ title: regex }).exec(function (err, materiales) {
            if (err) {
                reject('Error al cargar los materiales', err);
            } else {
                resolve(materiales);
            }
        });
    });
}
//# sourceMappingURL=buscar.controller.js.map