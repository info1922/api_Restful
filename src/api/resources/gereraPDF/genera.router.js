import express from 'express';
import passport from 'passport';
import generaController from './genera.controller';
import { isAdmin } from '../../middlewares/is-admin';
export const generaRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

generaRouter.route('/:tipo')
    .get(generaController.getMateriales);