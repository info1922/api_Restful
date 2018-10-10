'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    validateBody: function validateBody(body) {
        var schema = _joi2.default.object().keys({
            materiales: _joi2.default.array().items().required(),
            nombre: _joi2.default.string().required(),
            direccion: _joi2.default.string()
        });

        var _Joi$validate = _joi2.default.validate(body, schema),
            value = _Joi$validate.value,
            error = _Joi$validate.error;

        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    }
};
//# sourceMappingURL=lugar.service.js.map