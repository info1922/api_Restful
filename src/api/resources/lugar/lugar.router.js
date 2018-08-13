import express from 'express';
import passport from 'passport';
import lugarController from './lugar.controller';

import { isAdmin } from '../../middlewares/is-admin';

export const lugarListRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
const userPolicy = passport.authenticate('jwt', { session: false });

lugarListRouter.route('/')
    .post(userPolicy, lugarController.create)
    .get(userPolicy, lugarController.findAll);