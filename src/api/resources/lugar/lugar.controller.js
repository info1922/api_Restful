import Joi from 'joi';
import lugarService from "./lugar.service";
import lugarModel from "./lugar.model";
import materialModel from "../material/material.model";

/* jshint ignore:start */
export default {

    async create(req, res) {
        try {
            const { value, error } = lugarService.validateBody(req.body);
            if (error && error.details) {
                return res.status(500).json({ error })
            }

            const lugar = await lugarModel.create(Object.assign({}, value, { usuario: req.currentUser._id }));

            /**
             * TODO: No asignara materiales cuando se cree un nuevo lugar
             */

            return res.status(200).json({ ok: true, lugar });

        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async findAll(req, res) {
        try {
            const lugarlist = await lugarModel.find()
                .populate('materiales')
                .populate('usuario', 'nombre apellido local google facebook');
            return res.status(200).json({ ok: true, lugarlist });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async findOne(req, res) {

        try {
            let { id } = req.params;

            const lugar = await lugarModel.findById(id)
                .populate('usuario')
                .populate('materiales');

            if (!lugar) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro el lugar' })
            }

            return res.status(200).json({ ok: true, lugar });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }


    },


    async update(req, res) {

        try {
            let id = req.params.id;
            let body = req.body;
            const user = req.currentUser._id;

            let lug1 = {
                nombre: body.nombre,
                usuario: req.currentUser._id,
            }


            const mat = body.materiales;
            // console.log('Lugares para agregar: ', mat.length);


            const mater = await materialModel.find({ _id: mat }).where('asignado', false);
            // console.log('Lugares encontrados: ', mater);


            if (mater.length <= 0) {

                // console.log('Id del delugar: ', req.params.id);
                console.log('No hay materiales');
                const lugar = await lugarModel.findOneAndUpdate({ _id: req.params.id }, lug1, { new: true });
                console.log(lugar);
                return res.status(200).json({ ok: true, mensaje: 'Lugar actualizado m=0', lugar });

            } else {

                // console.log('Hay mas de un material');

                // Guardamos los materiales en la objeto y guardamos en la BD
                const lugar = await lugarModel.findOneAndUpdate(id, { $set: { 'nombre': req.body.nombre }, $push: { 'materiales': req.body.materiales } }, { new: true }).populate('materiales');

                // console.log('Lugar actualizado: ', lugar);

                // Actualizamos los materiales con asignado = true

                mater.map((d) => {

                    // Revisar por que remplaza el valor anterior por el nuevo
                    materialModel.findById(d._id).exec((err, material) => {
                        if (err) {
                            throw 'Error al actualizar material';
                        }
                        if (!material) {
                            throw 'No hay materiales en el arreglo';
                        }
                        console.log('Materiales agregados: ', material);

                        if (material.asignado === false) {
                            material.asignado = true;
                            material.lugar = req.params.id;
                            material.usuario = req.currentUser._id;

                            material.save((err, materialUpdate) => {
                                if (err) {
                                    throw err;
                                }
                                console.log('Materiales actalizados: ', materialUpdate);
                            });
                        } else {
                            console.log('Este material ya esta asignado', material.title);
                        }

                    });
                });

                return res.status(200).json({ mensaje: 'Lugar actualizado m>0', lugar });

            }

        } catch (error) {
            return res.status(500).json({ error: { message: 'Error al actualiza el lugar' }, algo: error });
        }

    },

    async delete(req, res) {
        try {
            let id = req.params.id;

            const lugar = await lugarModel.find({ _id: id });

            let vacio;

            console.log('Lugar a buscar: ', lugar);

            const lug = await lugarModel.findById({ _id: id });
            if (!lugar) {
                return res.status(400).json({ ok: false, mensaje: 'Lugar no encontrado' });
            }
            if (lugar === null) {
                return res.status(400).json({ ok: false, mensaje: 'Lugar no encontrado' });
            }

            // Tiene materiales en el arreglo ?? 
            lugar.map((d) => {
                vacio = d.materiales;
            });

            if (vacio.length === 0) {
                console.log('No tiene materiales');
                lug.remove();
                return res.status(200).json({ ok: true, mensaje: 'Lugar eliminado', lugar });
            } else {
                console.log('Contiene materiales', vacio.length);
                let mbuscar
                    // Recorremos el arreglo del lugar
                lugar.map((m) => {
                    mbuscar = m.materiales;
                    console.log(mbuscar);
                    // Recorremos el arreglo de materiales de un lugar
                    mbuscar.map((b) => {
                        // Buscamos los materiales dentro del arreglo
                        materialModel.findByIdAndUpdate({ _id: b }, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': lugar } }).exec((err, material) => {
                            if (err) {
                                return 'Error';
                            }
                            if (!material) {
                                throw 'Materiales nulos';
                            }

                        });
                        console.log(b);
                    });

                });
            }

            lug.remove();

            return res.status(200).json({ ok: true, mensaje: 'Lugar eliminado', lugar });


        } catch (error) {
            return res.status(500).json({ ok: false, mensaje: 'Error en la petición' });
        }
    }

}