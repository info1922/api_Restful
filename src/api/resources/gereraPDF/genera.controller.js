import Material from '../material/material.model';
/* jshint ignore:start */

export default {
    getMateriales(req, res) {

        Material.find({}).exec((err, materiales) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al cargar los materiales'
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
                datos.push([{ image: `./uploads/materiales/${d.img}`, width: 50, height: 50, }, { text: d.title }, { text: d.cantidad }, { text: JSON.stringify(d.usuario) }]);
            });


            console.log(datos);

            var pdfDoc = require('./genera.service').create(datos);
            pdfDoc.end();
            pdfDoc.pipe(res);



            // console.log(titulo);

            // var data = [{
            //         image: './assets/pdf.png',
            //         width: 50,
            //         height: 50,
            //     },
            //     { text: titulo },
            //     'OK?', 'Otra'
            // ];


            // materiales.forEach(element => {
            //     console.log(element.asignado);

            // });

            return console.log(materiales);
        });

        // return res.status(200).json({ ok: true, mensaje: 'Generando pdf' });

    }
};