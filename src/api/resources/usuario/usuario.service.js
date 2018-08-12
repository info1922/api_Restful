import Joi from 'joi';
import bcrypt from 'bcryptjs';

export default {

    encryptPassword(plainText) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainText, salt);
    },

    comparePassword(plainText, encryptedPassword) {
        return bcrypt.compareSync(plainText, encryptedPassword);
    },

    validateSignup(body) {

        const schema = Joi.object().keys({
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            role: Joi.number().integer(),
        });

        const { value, error } = Joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    validateLogin(body) {

        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        });

        const { value, error } = Joi.validate(body, schema);

        if (error && error.details) {
            return { error };
        }
        return { value };
    }

};