import express from 'express';
import passport from 'passport';
import materialController from './material.controller';
import { isAdmin } from '../../middlewares/is-admin';

export const materialRouter = express.Router();

// USER_ROLE solo puede ver los registros.
// ADMIN_ROLE puede eliminar, editar y registrar.

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
const userPolicy = passport.authenticate('jwt', { session: false });

materialRouter.route('/')
    .post(adminPolicy, materialController.create)
    .get(adminPolicy, materialController.findAll);

materialRouter.route('/bienvenido')
    .get(adminPolicy, materialController.bienvenida);

materialRouter.route('/:id')
    .get(adminPolicy, materialController.findOne)
    .delete(adminPolicy, materialController.delete)
    .put(adminPolicy, materialController.update);