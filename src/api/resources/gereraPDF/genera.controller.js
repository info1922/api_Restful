import Material from '../material/material.model';
import Lugar from '../lugar/lugar.model';
/* jshint ignore:start */

export default {
    getMateriales(req, res) {

        const tipo = req.params.tipo;
        // utilizar if para materiales y lugares

        if (tipo === 'materiales') {
            console.log('materiales');
            Material.find({}).populate('lugar').exec((err, materiales) => {
                // if (err) {
                //     return res.status(400).json({
                //         ok: false,
                //         mensaje: 'Error generando el PDF'
                //     });
                // }

                // console.log(materiales);

                var datos = [];

                // console.log('materiales en BD: ', materiales);
                datos.push([
                    { text: 'Imagen', bold: true, fontSize: 12 },
                    { text: 'Nombre', bold: true, fontSize: 12 },
                    { text: 'Cantidad', bold: true, fontSize: 12 },
                    { text: 'Lugar', bold: true, fontSize: 12 }
                ]);

                // console.log('Arrglo de datos: ', datos);
                // console.log(materiales);
                materiales.map((d) => {
                    // console.log('Map de materiales: ', d);
                    // buscar coincidencias de id materiales en lugares-> materiales
                    datos.push([
                        { image: d.img ? `./uploads/materiales/${d.img}` : './assets/no-imagen.png', width: 50, height: 50 },
                        { text: d.title },
                        { text: d.cantidad },
                        { text: d.lugar ? d.lugar.nombre : 'Sin asignar' }
                        // { text: JSON.stringify(d.usuario) }
                    ]);
                });


                // console.log('Los datos materiales: ', datos);


                var pdfDoc = require('./genera.service').create(datos, tipo);
                pdfDoc.end();
                pdfDoc.pipe(res);
                // pdfDoc.end();
                // pdfDoc.pipe(res);
                // res.status(200);
                // return console.log(materiales);
            });
        } else if (tipo === 'lugares') {
            console.log('lugares');
            Lugar.find({}).populate('materiales').exec((err, lugares) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error generando el PDF'
                    });
                }

                var datos = [];

                // console.log(lugares);
                datos.push([{ text: 'Imagen', bold: true, fontSize: 12 },
                    { text: 'Nombre', bold: true, fontSize: 12 },
                    { text: 'Dirección', bold: true, fontSize: 12 },
                    { text: 'No. de materiales', bold: true, fontSize: 12 }
                ]);

                lugares.map((d) => {
                    let materiales = d.materiales;
                    materiales.map((m) => {
                        let nombreMateriales = [];
                        nombreMateriales.push(m.title);
                        // console.log(nombreMateriales);
                    });
                    // console.log('materiales : ', materiales);
                    // buscar coincidencias de id materiales en lugares-> materiales
                    datos.push([{ image: d.img ? `./uploads/lugares/${d.img}` : './assets/no-imagen.png', width: 50, height: 50, },
                        { text: d.nombre }, { text: d.direccion ? d.direccion : 'Sin dirección' },
                        {
                            text: d.materiales ?
                                materiales.length : 'No tiene materiales'
                        }
                        // { text: JSON.stringify(d.usuario) }
                    ]);



                });


                // console.log('Los datos: lugares ', datos);


                var pdfDoc = require('./genera.service').create(datos, tipo);
                pdfDoc.end();
                pdfDoc.pipe(res);

                // return console.log(materiales);
            });
        } else {
            // console.log('Colección incorrecta');
            return res.status(400).json({ ok: false, mensaje: 'Colección incorrecta' });
        }



        // return res.status(200).json({ ok: true, mensaje: 'Generando pdf' });

    }


};