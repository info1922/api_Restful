import Joi from 'joi';

export default {
    validateBody(body) {
        const schema = Joi.object().keys({
            materiales: Joi.array().items(),
            nombre: Joi.string().required(),
            direccion: Joi.string()
        });

        const { value, error } = Joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }
        return { value };
    }
}