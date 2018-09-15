import Material from '../material/material.model';
import Lugar from '../lugar/lugar.model';
/* jshint ignore:start */

export default {
    getMateriales(req, res) {

        Material.find({}).populate('lugar').exec((err, materiales) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error generando el PDF'
                });
            }

            var datos = [];

            console.log(materiales);
            datos.push([{ text: 'Imagen', bold: true, fontSize: 12 },
                { text: 'Nombre', bold: true, fontSize: 12 },
                { text: 'Cantidad', bold: true, fontSize: 12 },
                { text: 'Lugar', bold: true, fontSize: 12 }
            ]);

            materiales.map((d) => {
                // buscar coincidencias de id materiales en lugares-> materiales
                datos.push([{ image: d.img ? `./uploads/materiales/${d.img}` : './assets/no-imagen.png', width: 50, height: 50, },
                    { text: d.title }, { text: d.cantidad },
                    { text: d.lugar ? d.lugar.nombre : 'Sin asignar' }
                    // { text: JSON.stringify(d.usuario) }
                ]);
            });


            console.log(datos);

            var pdfDoc = require('./genera.service').create(datos);
            pdfDoc.end();
            pdfDoc.pipe(res);

            // return console.log(materiales);
        });

        // return res.status(200).json({ ok: true, mensaje: 'Generando pdf' });

    }


};