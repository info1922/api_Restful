import Joi from 'joi';
import lugarService from "./lugar.service";
import lugarModel from "./lugar.model";
import materialModel from "../material/material.model";
import { Mongoose } from 'mongoose';
// import { Mongoose } from 'mongoose';

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
                .populate('materiales')
                .populate('usuario', 'nombre apellido local google facebook');
            return res.status(200).json({ ok: true, lugarlist });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async update(req, res) {
        try {

            let id = req.params.id;
            var body = req.body;
            const user = req.currentUser._id;

            let lug = {
                nombre: body.nombre,
                materiales: body.materiales,
                usuario: req.currentUser._id
            };

            const mat = body.materiales;

            // Obtenemos los materiales que se van a agregar al lugar con valor false
            const mater = await materialModel.find({ _id: mat }).where('asignado', false);
            console.log('Encontrado: ', mater);
            // let asignado = true;

            // Guardamos el material en el lugar
            const lugar = await lugarModel.findOneAndUpdate(id, lug, { new: true }).populate('materiales');
            // Actualiza el material a true - Guardado aquí
            console.log(lugar);

            return res.status(200).json({ ok: true, mensaje: 'Lugar actualizado', lugar });

        } catch (error) {
            return res.status(500).json({ error: { message: 'Error al actualiza el lugar' }, algo: error });
        }
    }
}




// Update 
//     async update(req, res) {
//         try {

//             let id = req.params.id;
//             var body = req.body;
//             const user = req.currentUser._id;

//             let lug = {
//                 nombre: body.nombre,
//                 materiales: body.materiales,
//                 usuario: req.currentUser._id
//             };

//             const mat = body.materiales;

//             // buscar los materiales que se van a agregar al lugar solo si asignado = false
//             await materialModel.find({ _id: mat }, { asignado: 'false' }, (err, guardado) => {
//                     // actualiza solo si asignado = false 
//                     // y guardamos la referencia del material en el lugar
//                     await lugarModel.findByIdAndUpdate(id, lug, { new: true });
//             });

//             // actualizamos el material para que no se pueda agregar despues


//             console.log('Encontrado: ', mater);
//             // let asignado = true;

//             // Guardamos el material en el lugar
//             const lugar = await lugarModel.findByIdAndUpdate(id, lug, { new: true });
//             // Actualiza el material a true - Guardado aquí

//             return res.status(200).json({ ok: true, mensaje: 'Lugar actualizado', lugar });

//         } catch (error) {
//             return res.status(500).json({ error: { message: 'Error al actualiza el lugar' }, algo: error });
//         }
//     }
// }