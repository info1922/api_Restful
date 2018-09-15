var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());

/* jshint ignore:start */
export default {

    async getAll(req, res) {

        try {
            let tipo = req.params.tipo;
            let idImagen = req.params.id;

            let path = `./uploads/${tipo}/${idImagen}`;

            fs.exists(path, existe => {
                if (!existe) {
                    path = `./assets/no-imagen.png`;
                }
                res.sendfile(path);
            });

        } catch (error) {
            return res.status(400).json({ ok: false, mensaje: 'Error al buscar la imagen', errors: error });
        }

    }

};