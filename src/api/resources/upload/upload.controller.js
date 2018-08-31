var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());

import Usuario from '../usuario/usuario.model';
import Material from '../material/material.model';
import Lugar from '../lugar/lugar.model';
/* jshint ignore:start */

export default {
    update(req, res) {
        const tipo = req.params.tipo;
        const id = req.params.id;

        // Tipos validos
        const tiposValidos = ['lugares', 'materiales', 'usuarios'];

        // Crear las carpetas si no existen


        if (tiposValidos.indexOf(tipo) < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo de colección no es válida',
                errors: { message: 'El tipo de colección no es válida' }
            })
        }

        // Validar si mandan archivo
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Por favor selecciona un archivo de imagen',
                errors: { message: 'Selecciona un archivo de imagen' }
            })
        }


        // Obtener el nombre de la imagen y extención
        // Arreglo del nombre del archivo cortado por el punto
        const archivo = req.files.imagen;
        const nombreCortado = archivo.name.split('.');
        const extencionArchivo = nombreCortado[nombreCortado.length - 1];

        // Extenciones permitidas
        const extencionesValidadas = ['png', 'JPG', 'PNG', 'jpg', 'JPEG', 'jpeg'];

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
        const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencionArchivo}`;

        // Mover el archivo del temporal a un path
        const path = `./uploads/${tipo}/${nombreArchivo}`;

        archivo.mv(path, err => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover archivo',
                    errors: err
                });
            }
        });

        subirPorTipo(tipo, id, nombreArchivo, res, path);

    },


};

function subirPorTipo(tipo, id, nombreArchivo, res, path) {
    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {
            if (!usuario) {
                // Eliminamos la imagen de usuario incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este usuario no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este usuario no existe', err });
            }

            const pathViejo = './uploads/usuarios/' + usuario.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar la imagen', err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen de usuario actualizada', usuarioActualizado })
            });


        });
    }
    if (tipo === 'lugares') {

        Lugar.findById(id, (err, lugar) => {
            if (!lugar) {
                // Eliminamos la imagen del lugar incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este lugar no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este lugar no existe', err });
            }

            const pathViejo = './uploads/lugares/' + lugar.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            lugar.img = nombreArchivo;

            lugar.save((err, lugarActualizado) => {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar el lugar', err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen del lugar actualizada', lugarActualizado })
            });

        });

    }
    if (tipo === 'materiales') {

        Material.findById(id, (err, material) => {

            if (!material) {
                // Eliminamos la imagen del lugar incorrecto
                fs.unlinkSync(path);
                return res.status(400).json({ ok: false, mensaje: 'Este material no existe' });
            }
            if (err) {
                return res.status(500).json({ ok: false, mensaje: 'Este material no existe', err });
            }

            const pathViejo = './uploads/materiales/' + material.img;

            // Si ya existe un archivo, lo remplaza
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            material.img = nombreArchivo;

            material.save((err, materialActualizado) => {
                if (err) {
                    return res.status(500).json({ ok: false, mensaje: 'Error al actualizar el material', err });
                }
                return res.status(200).json({ ok: true, mensaje: 'Imagen del material actualizada', materialActualizado })
            });

        });

    }
}

function crearDirectorio(tipo) {
    const directorio = `./uploads/${tipo}`;

    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio);
        // console.log('Se creo directorio: ', directorio);
    }

    // console.log('Ya existe este directorio');
}