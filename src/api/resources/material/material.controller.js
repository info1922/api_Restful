import Joi from 'joi';
import Material from './material.model';
import Lugar from '../lugar/lugar.model';

/* jshint ignore:start */
export default {

    async create(req, res) {

        try {


            // Guardar el material con el id del lugar para referencias y cambiar
            // asignado = true
            const body = req.body;
            // const user = req.currentUser._id;

            let material = new Material({
                title: body.title,
                url: body.url,
                asignado: body.asignado,
                cantidad: body.cantidad,
                img: body.img,
                lugar: body.lugar,
                usuario: req.currentUser._id,
            });

            const existLugar = material.lugar;

            // Verifica si un material esta asignado a un lugar
            if (existLugar === undefined) {
                // console.log('Esta vacio');
                material.asignado = false;
                const mater = await material.save();

                // console.log('Vacio: ', mater);
                return res.status(200).json({ ok: true, mater });
            } else {
                // console.log('Tiene dato');
                material.asignado = true;
                const mater = await material.save();
                // console.log('lleno: ', mater);
                // console.log('Id nuevo material: ', mater._id)
                const lug = await Lugar.findByIdAndUpdate({ _id: body.lugar }, { $push: { 'materiales': mater._id } }, { new: true });
                // console.log('Lugar : ', lug);
                return res.status(200).json({ ok: true, mater });
            }

            // const mater = await material.save();
            // console.log('Id del lugar: ', existLugar);



        } catch (error) {
            return res.status(500).json({ ok: false, msg: 'Fallo el guardado', error: error });
        }

    },

    async findAll(req, res) {
        try {

            const { page, perPage } = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 5,
                populate: { path: 'usuario', select: 'nombre apellido' }
            }

            const materiales = await Material.paginate({}, options);
            return res.status(200).json(materiales);
        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }
    },

    async findOne(req, res) {

        try {
            let { id } = req.params;

            const material = await Material.findById(id).populate('usuario', 'nombre apellido');

            if (!material) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro el material' })
            }

            return res.status(200).json({ ok: true, material });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }


    },
    async delete(req, res) {

        try {

            let { id } = req.params;

            // Buscamos el lugar
            const material = await Material.findById({ _id: id });
            // console.log('Encontrado: ', material);

            // Obtener el id del lugar que esta agregado
            // console.log('Id del lugar al que pertence: ', material.lugar._id);

            // Encontramos el lugar
            const lg = await Lugar.findById({ _id: material.lugar._id });
            // console.log('Lugar al que pertenece Antes: ', lg);

            // Actualizar el lugar, sacando el id a eliminar
            const lug = await Lugar.findByIdAndUpdate({ _id: material.lugar._id }, { $pull: { 'materiales': material._id } }, { new: true });
            // console.log('Lugar actualizado Despues: ', lug);

            // Por ultimo eliminamos el material
            const deletematerial = await Material.findByIdAndRemove({ _id: id });


            if (!material) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro el material' })
            }

            return res.status(200).json({ ok: true, deletematerial });

        } catch (error) {
            return res.status(500).json({ ok: false, error });
        }

    },

    async update(req, res) {

        try {

            let id = req.params.id;
            var body = req.body
                //
            let mater = {
                title: body.title,
                url: body.url,
                asignado: body.asignado,
                cantidad: body.cantidad,
                img: body.img,
                lugar: body.lugar,
                desvincular: body.desvincular,
                usuario: req.currentUser._id,
            };
            //
            const user = req.currentUser._id;

            const des = body.desvincular;
            const existLugar = mater.lugar;

            // console.log('Lugar: ', existLugar);

            //Buscamos el material
            const mafind = await Material.findById(id);
            // console.log('Material encontrado: ', mafind);
            // console.log(' Lugar original: ', mafind.lugar);
            // console.log(' Lugar a actualizar: ', mater.lugar);
            // console.log('Entrando al if ');
            // console.log("Asignado", mafind.asignado);
            if (mafind.asignado === true) {


                if (mafind.lugar == mater.lugar && mater.desvincular == false) {
                    console.log('Aplica lugares iguales, desvincular = false');
                    // Actualiza solo el cuerpo del material
                    // mater.asignado = true; }}}}
                    const material = await Material.findByIdAndUpdate(id, mater, { new: true });
                    return res.status(200).json({ ok: true, material });
                }
                // && mater.desvincular === true
                // console.log(mater.desvincular);
                if (mater.desvincular == true) {
                    console.log('Aplica lugares diferentes, desvincular = true');
                    // Busca el lugar donde se encuentra el material
                    const lugar = await Lugar.findById({ _id: mafind.lugar });
                    console.log('Lugar al que pertenece', lugar);
                    console.log('Id a eliminar: ', mafind._id);
                    // Elimina la referencia del material en el lugar
                    const lugE = await Lugar.findByIdAndUpdate({ _id: mafind.lugar }, { $pull: { 'materiales': mafind._id } }, { new: true });

                    console.log('Lugar Actualizado', lugE);
                    mater.asignado = false;
                    mater.desvincular = false;
                    // Eliminar la referencia de lugar en material
                    console.log('Lugar a quitar de material: ', mafind.lugar);
                    const material = await Material.findByIdAndUpdate(id, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': mafind.lugar } }, { new: true });
                    return res.status(200).json({ ok: true, material, mensaje: 'Desvinculado y listo para actualizar' });
                }

                res.status(200).json({ ok: true, mensaje: 'Algo aqui' });

            }


            if (mafind.asignado === false) {
                // console.log('Agregando a lugar');
                // mater.asignado = true;
                mater.desvincular = false;
                // Validar si biene un lugar en la petición
                console.log(mater.lugar);
                // Revisar que en el front el null no de prblemas
                if (mater.lugar === undefined || mater.lugar === null) {
                    console.log('El lugar biene vacio');
                    mater.asignado = false
                    const material = await Material.findByIdAndUpdate(id, mater, { new: true });
                    return res.status(200).json({ mensaje: 'Material', material });
                }
                mater.asignado = true;
                const material = await Material.findByIdAndUpdate(id, mater, { new: true });
                const lug = await Lugar.findByIdAndUpdate({ _id: body.lugar }, { $push: { 'materiales': material._id } }, { new: true });
                // console.log('Se actualiza lugar: ', lug);
                return res.status(200).json({ ok: true, material, mensaje: 'Asignación correcta' });

            }


        } catch (error) {
            return res.status(500).json({ ok: false, error: { message: 'Error al actualizar el material' }, algo: error });
        }

    }

}