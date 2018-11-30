'use strict';

var _pdfmake = require('pdfmake');

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fonts = {
    Roboto: {
        normal: './assets/fonts/Roboto-Regular.ttf',
        bold: './assets/fonts/Roboto-Medium.ttf',
        italics: './assets/fonts/Roboto-Italic.ttf',
        bolditalics: './assets/fonts/Roboto-Italic.ttf'
    }
};

var printer = new _pdfmake2.default(fonts);

var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var hoy = new Date();
var mes = meses[hoy.getMonth()];
var fechaD = hoy.getDate() + ' de ' + mes + ' de ' + hoy.getFullYear();

// var data = [{
//     image: './assets/pdf.png',
//     width: 50,
//     height: 50,
// }, 'Another one here', 'OK?', 'Otra'];

module.exports = {
    create: function create(datos, tipo) {

        var docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 40, 40, 60],
            footer: function footer(currentPage, pageCount) {
                return [{ text: 'Pag. ' + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'page' }];
            },
            // header: function(currentPage, pageCount, pageSize) {
            //     // you can apply any logic and return any valid pdfmake element

            //     return [
            //         { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
            //         { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
            //     ];
            // },


            // watermark: { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false },
            content: [{
                columns: [{
                    width: 60,
                    image: './assets/1.png'

                }, {
                    width: 'auto',
                    text: 'H. Ayuntamiento Constitucional De San Miguel Suchixtepec, Miahutlán Oaxaca.',
                    style: 'header',
                    alignment: 'center'
                }, {
                    width: 60,
                    image: './assets/escudo2.png'

                }]
            }, { text: '' + fechaD, style: 'fecha', alignment: 'center' }, { text: 'Registros de ' + tipo, style: 'subheader', alignment: 'center', margin: [0, 30, 0, 40] }, {
                canvas: [{
                    type: 'line',
                    x1: 40,
                    y1: 0,
                    x2: 470, // Largo
                    y2: 0,
                    lineWidth: 1
                }]
            }, {
                style: 'tableExample',
                table: {
                    widths: ['auto', '*', '*', 200],
                    headerRows: 1,
                    // body: [
                    //     [{ text: 'Imagen', bold: true, fontSize: 12, },
                    //         { text: 'Nombre', bold: true, fontSize: 12 },
                    //         { text: 'Cantidad', bold: true, fontSize: 12 },
                    //         { text: 'Lugar', bold: true, fontSize: 12 }
                    //     ],
                    //     datos
                    // ]
                    body: datos
                }
            }],

            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    margin: [40, 20, 40, 20]
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                fecha: {
                    fontSize: 10,
                    bold: false,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 30, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                page: {
                    // heights: 70,
                    fontSize: 9,
                    bold: false,
                    margin: [0, 0, 30, 0]
                }
            }

        };

        var fecha = Date.now();
        // const mil = fecha.
        // const fileName = `materiales-${fecha}.pdf`;
        // const writeStream = fs.createWriteStream(fileName);
        var pdfDoc = printer.createPdfKitDocument(docDefinition);

        return pdfDoc;
    }

};
//# sourceMappingURL=genera.service.js.map