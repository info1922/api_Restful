'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var materialSchema = new Schema({

    title: { type: String, required: [true, 'El nombre es necesario'] },
    url: { type: String, required: [true, 'La url es necesaria'] },
    asignado: { type: Boolean, required: true, default: false },
    cantidad: { type: Number, default: 1, min: 1, max: Infinity, required: true },
    img: { type: String, required: false },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lugar: {
        type: Schema.Types.ObjectId,
        ref: 'Lugar',
        required: false
    },
    desvincular: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

materialSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('Material', materialSchema);
//# sourceMappingURL=material.model.js.map