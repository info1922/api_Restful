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


var lugarSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    direccion: { type: String, required: false },
    img: { type: String, required: false },
    materiales: [{
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: false
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// lugarSchema.plugin(mongoosePaginate);

exports.default = _mongoose2.default.model('Lugar', lugarSchema);
//# sourceMappingURL=lugar.model.js.map