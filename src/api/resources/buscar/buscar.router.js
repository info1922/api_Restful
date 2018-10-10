import express from 'express';
import passport from 'passport';

import buscarController from './buscar.controller';

import { isAdmin } from '../../middlewares/is-admin';

export const buscarListRouter = express.Router();

export const buscarTodoRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

buscarListRouter.route('/:tabla/:buscar')
    .get(adminPolicy, buscarController.buscarColeccion);

buscarTodoRouter.route('/:todo')
    .get(adminPolicy, buscarController.buscarTodo);