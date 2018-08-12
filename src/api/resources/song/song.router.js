import express from 'express';
import passport from 'passport';
import songController from './song.controller';
import { isAdmin } from '../../middlewares/is-admin';

export const songRouter = express.Router();

// USER_ROLE solo puede ver los registros.
// ADMIN_ROLE puede eliminar, editar y registrar.

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
const userPolicy = passport.authenticate('jwt', { session: false });

songRouter.route('/')
    .post(adminPolicy, songController.create)
    .get(userPolicy, songController.findAll);

songRouter.route('/:id')
    .get(userPolicy, songController.findOne)
    .delete(adminPolicy, songController.delete)
    .put(adminPolicy, songController.update);