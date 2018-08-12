import Joi from 'joi';
import Song from './song.model';

/* jshint ignore:start */
export default {

    async create(req, res) {

        try {

            const schema = Joi.object().keys({
                title: Joi.string().required(),
                url: Joi.string().required(),
                rating: Joi.number().integer().min(0).max(5).optional()
            });

            const { value, error } = Joi.validate(req.body, schema);

            if (error && error.details) {
                return res.status(400).json({ ok: false, error });
            }

            const song = await Song.create(value);
            return res.status(200).json({ ok: true, song });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }

    },

    async findAll(req, res) {
        try {

            const { page, perPage } = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 5
            }

            const songs = await Song.paginate({}, options);
            return res.status(200).json(songs);
        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }
    },

    async findOne(req, res) {

        try {
            let { id } = req.params;

            const song = await Song.findById(id);

            if (!song) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro la pista' })
            }

            return res.status(200).json({ ok: true, song });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }


    },

    async delete(req, res) {

        try {

            let { id } = req.params;
            const song = await Song.findByIdAndRemove({ _id: id });

            if (!song) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro la pista' })
            }

            return res.status(200).json({ ok: true, song });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }

    },

    async update(req, res) {

        try {

            let { id } = req.params;
            const schema = Joi.object().keys({
                title: Joi.string().optional(),
                url: Joi.string().optional(),
                rating: Joi.number().integer().min(0).max(5).optional(),
            });

            const { value, error } = Joi.validate(req.body, schema);

            if (error && error.details) {
                return res.status(400).json({ ok: false, error });
            }

            const song = await Song.findOneAndUpdate({ _id: id }, value, { new: true });

            if (!song) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro la pista' })
            }

            return res.status(200).json({ ok: true, song });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }

    }



}