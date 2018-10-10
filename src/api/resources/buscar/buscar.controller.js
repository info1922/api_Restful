import Material from '../material/material.model';
import lugarModel from '../lugar/lugar.model';

export default {
    buscarColeccion(req, res) {
        let buscar = req.params.buscar;
        let tabla = req.params.tabla;
        let regex = new RegExp(buscar, 'i');

        let promesa;

        switch (tabla) {
            case 'usuarios':
                promesa = buscarUsuarios(buscar, regex);
                break;

            case 'materiales':
                promesa = buscarMateriales(buscar, regex);
                break;

            case 'lugares':
                promesa = buscarLugares(buscar, regex);
                break;

            default:
                return res.status(400).json({ ok: false, mensaje: 'Colección no valida' });
        }

        promesa.then(data => {
            res.status(200).json({
                ok: true,
                [tabla]: data
            });
        });

        // res.send('Buscar por colección');
    },

    buscarTodo(req, res, next) {
        let todo = req.params.todo;
        let regex = new RegExp(todo, 'i');


        Promise.all([
            buscarLugares(todo, regex),
            buscarMateriales(todo, regex)
        ]).then(respuestas => {
            res.status(200).json({
                ok: true,
                lugares: respuestas[0],
                materiales: respuestas[1]
            });
        });

    },


};

function buscarLugares(buscar, regex) {
    return new Promise((resolve, reject) => {
        lugarModel.find({ nombre: regex })
            .exec((err, lugares) => {
                if (err) {
                    reject('Error al cargar los lugares', err);
                } else {
                    resolve(lugares);
                }
            });
    });
}

function buscarMateriales(buscar, regex) {
    return new Promise((resolve, reject) => {
        Material.find({ title: regex })
            .exec((err, materiales) => {
                if (err) {
                    reject('Error al cargar los materiales', err);
                } else {
                    resolve(materiales);
                }
            });
    });
}