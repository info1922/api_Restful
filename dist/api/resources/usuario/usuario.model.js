'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.USER_ROLE = exports.ADMIN_ROLE = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADMIN_ROLE = exports.ADMIN_ROLE = 1;
var USER_ROLE = exports.USER_ROLE = 2;

var Schema = _mongoose2.default.Schema;


var userSchema = new Schema({
    local: { email: String, password: String },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    img: { type: String, required: false },
    // email: { type: String, required: [true, 'El correo es necesario'], unique: true },
    // password: { type: String, required: [true, 'La contraseña es necesaria'] },
    role: { default: ADMIN_ROLE, required: true, type: Number },
    google: { email: String, id: String, displayName: String, token: String },
    facebook: { email: String, id: String, displayName: String, token: String }

}, {
    timestamps: true
});

userSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=usuario.model.js.map