import express from 'express';
import imagenController from './imagen.controller';
import passport from 'passport';
import { isAdmin } from '../../middlewares/is-admin';
var fileUpload = require('express-fileupload');

export const imagenRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

imagenRouter.route('/:tipo/:id')
    .get(fileUpload(), imagenController.getAll);