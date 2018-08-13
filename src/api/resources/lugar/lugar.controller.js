import lugarService from "./lugar.service";
import lugarModel from "./lugar.model";

/* jshint ignore:start */
export default {


    async create(req, res) {
        try {
            const { value, error } = lugarService.validateBody(req.body);
            if (error && error.details) {
                return res.status(500).json({ error })
            }

            const lugarlist = await lugarModel.create(Object.assign({}, value, { usuario: req.currentUser._id }));
            return res.status(200).json({ ok: true, lugarlist });

        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async findAll(req, res) {
        try {
            const lugarlist = await lugarModel.find()
                .populate('songs')
                .populate('usuario', 'nombre apellido local google facebook');
            return res.status(200).json({ ok: true, lugarlist });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}