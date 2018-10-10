'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _usuario = require('../usuario/usuario.model');

var _usuario2 = _interopRequireDefault(_usuario);

var _material = require('../material/material.model');

var _material2 = _interopRequireDefault(_material);

var _lugar = require('../lugar/lugar.model');

var _lugar2 = _interopRequireDefault(_lugar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());

/* jshint ignore:start */

exports.default = {
    update: function update(req, res) {
        var tipo = req.params.tipo;
        var id = req.params.id;

        // Tipos validos
        var tiposValidos = ['lugares', 'materiales', 'usuarios'];

        // Crear las carpetas si no existen


        if (tiposValidos.indexOf(tipo) < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo de colección no es válida',
                errors: { message: 'El tipo de colección no es válida' }
            });
        }

        // Validar si mandan archivo
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Por favor selecciona un archivo de imagen',
                errors: { message: 'Selecciona un archivo de imagen' }
            });
        }

        // Obtener el nombre de la imagen y extención
        // Arreglo del nombre del archivo cortado por el punto
        var archivo = req.files.imagen;
        var nombreCortado = archivo.name.split('.');
        var extencionArchivo = nombreCortado[nombreCortado.length - 1];

        // Extenciones permitidas
        var extencionesValidadas = ['png', 'JPG', 'PNG', 'jpg', 'JPEG', 'jpeg'];

        // Validar extención (-1 si no lo encuentra)
        if (extencionesValidadas.indexOf(extencionArchivo) < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Extención no valida',
                errors: { messag: 'Las extenciones permitidas son: ' + extencionesValidadas.join(', ') }
            });
        }

        // Creamos el path
        crearDirectorio(tipo);

        // Nombre personalizado 12323sda2323-122.png
        var nombreArchivo = id + '-' + new Date().getMilliseconds() + '.' + extencionArchivo;

        // Mover el archivo del temporal a un path
        var path = './uploads/' + tipo + '/' + nombreArchivo;

        archivo.mv(path, function (err) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover archivo',
                    errors: err
                });
            }
        });

        subirPorTipo(tipo, id, nombreArchivo, res, path);
    }
};


function subirPorTipo(tipo, id, nombreArchivo, res, path) {
    if (tipo === 'usuarios') {

        _usuario2.default.findById(id, function (err, usuario) {
            if (!usuario) {
                // Eliminamos la imagen de usuario incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este usuario no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este usuario no existe', err: err });
            }

            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;
            usuario.save(function (err, usuarioActualizado) {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar la imagen', err: err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen de usuario actualizada', usuarioActualizado: usuarioActualizado });
            });
        });
    }
    if (tipo === 'lugares') {

        _lugar2.default.findById(id, function (err, lugar) {
            if (!lugar) {
                // Eliminamos la imagen del lugar incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este lugar no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este lugar no existe', err: err });
            }

            var pathViejo = './uploads/lugares/' + lugar.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            lugar.img = nombreArchivo;

            lugar.save(function (err, lugarActualizado) {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar el lugar', err: err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen del lugar actualizada', lugarActualizado: lugarActualizado });
            });
        });
    }
    if (tipo === 'materiales') {

        _material2.default.findById(id, function (err, material) {

            if (!material) {
                // Eliminamos la imagen del lugar incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este material no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este material no existe', err: err });
            }

            var pathViejo = './uploads/materiales/' + material.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            material.img = nombreArchivo;

            material.save(function (err, materialActualizado) {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar el material', err: err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen del material actualizada', materialActualizado: materialActualizado });
            });
        });
    }
}

function crearDirectorio(tipo) {
    var directorio = './uploads/' + tipo;

    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio);
        // console.log('Se creo directorio: ', directorio);
    }

    // console.log('Ya existe este directorio');
}
//# sourceMappingURL=upload.controller.js.map