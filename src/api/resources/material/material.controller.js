import Joi from 'joi';
var fs = require('fs');
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
            return res.status(500).json({ ok: false, msg: 'Error al guardar el material', error });
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

    // Revisar esta función
    async delete(req, res) {

        try {

            let { id } = req.params;

            // Buscamos el lugar
            const material = await Material.findById({ _id: id }).populate('lugar');
            let lugarExiste = material.lugar;
            let materialId = material._id;
            let lug;
            let materialD;
            let path;
            let nombreImagen = material.img;

            // Asignar el nombre de la imagen

            if (!material) {
                return res.status(404).json({ ok: false, mensaje: 'No se encontro el material' })
            }

            if (lugarExiste) {
                // console.log('1.- Existe lugar');
                lug = await Lugar.findByIdAndUpdate({ _id: lugarExiste._id }, { $pull: { 'materiales': materialId } }, { new: true });
                if (nombreImagen) {
                    // console.log('2.- Campo imagen existe');
                    path = `./uploads/materiales/${nombreImagen}`;
                    fs.exists(path, existe => {
                        if (existe) {
                            // console.log('3.- Existe imagen');
                            fs.unlinkSync(path);
                        }
                        // console.log('2.- No existe la imagen');
                    });
                }
                //Eliminar material aquí
                materialD = await Material.findByIdAndRemove({ _id: id });
            } else {
                // console.log('no existe lugar');
                if (nombreImagen) {
                    // console.log('2.- Campo imagen existe');
                    path = `./uploads/materiales/${nombreImagen}`;
                    fs.exists(path, existe => {
                        if (existe) {
                            // console.log('3.- Existe imagen');
                            fs.unlinkSync(path);
                        }
                    });
                }
                //Eliminar material aquí
                materialD = await Material.findByIdAndRemove({ _id: id });
            }

            return res.status(200).json({ ok: true, mensaje: 'Material eliminado correctamente', materialD });

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
                lugar: body.lugar,
                desvincular: body.desvincular,
                usuario: req.currentUser._id,
            };
            //
            const user = req.currentUser._id;

            const des = body.desvincular;
            const existLugar = mater.lugar;

            const mafind = await Material.findById(id).populate('lugar');

            // Suponemos que el campo lugar una vez asignado el material; siempre tendra el id del lugar
            // al que pertenece


            // Cuando aun no se asigna un lugar y solo se actualiza
            if (mater.lugar === undefined) {
                console.log(mater.title, mater.url);
                // const mafind = await Material.findById(id).populate('lugar');
                await Material.findByIdAndUpdate(id, mater, { new: true });
                const matActual2 = await Material.findByIdAndUpdate(id, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': mater.lugar } }, { new: true })
                    // console.log(mater);
                return res.status(200).json({ ok: true, matActual2 });
            }

            // NOTA: Supongamos que el lugar a asignar existe en la BD
            if (mater.lugar !== undefined) {
                // Buscamos el lugar de mater.lugar en la BD, si existe sigue ->
                // Validar si el campo material.lugar existe Si es la primera vez que se le asigna a un lugar
                if (mafind.lugar === undefined) {
                    const nuevoOrigen = await Lugar.findByIdAndUpdate({ _id: mater.lugar }, { $push: { 'materiales': mafind._id } }, { new: true })
                    mater.asignado = true;
                    mater.desvincular = false;
                    const matActual2 = await Material.findByIdAndUpdate(id, mater, { new: true });
                    return res.status(200).json({ ok: true, matActual2 })
                }


                // Desvincular del origen lugar y actualización material
                const viejoOrigen = await Lugar.findByIdAndUpdate({ _id: mafind.lugar._id }, { $pull: { 'materiales': mafind._id } }, { new: true });
                const matActual1 = await Material.findByIdAndUpdate(id, { $set: { 'asignado': false, 'desvincular': false }, $unset: { 'lugar': mater.lugar } }, { new: true })


                //Vincular al nuevo origen lugar y actualización material
                // await Lugar.findByIdAndUpdate({ _id: body.lugar }, { $push: { 'materiales': material._id } }, { new: true });
                const nuevoOrigen = await Lugar.findByIdAndUpdate({ _id: mater.lugar }, { $push: { 'materiales': mafind._id } }, { new: true });
                mater.asignado = true;
                mater.desvincular = false;
                const matActual2 = await Material.findByIdAndUpdate(id, mater, { new: true });

                const lugarExiste = await Lugar.findById({ _id: mater.lugar });

                return res.status(200).json({ ok: true, matActual2 });

            }

        } catch (error) {
            return res.status(500).json({ ok: false, error: { message: 'Error al actualizar el material' }, algo: error });
        }

    }

}