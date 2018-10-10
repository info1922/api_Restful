import express from 'express';
import passport from 'passport';
import lugarController from './lugar.controller';

import { isAdmin } from '../../middlewares/is-admin';

export const lugarListRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
const userPolicy = passport.authenticate('jwt', { session: false });

lugarListRouter.route('/')
    .post(adminPolicy, lugarController.create)
    .get(adminPolicy, lugarController.findAll);

lugarListRouter.route('/:id')
    .put(adminPolicy, lugarController.update)
    .delete(adminPolicy, lugarController.delete)
    .get(adminPolicy, lugarController.findOne);
// .put(lugarController.update);