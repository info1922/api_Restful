import express from 'express';
import passport from 'passport';
import { isAdmin } from '../../middlewares/is-admin';

import uploadController from './upload.controller';
var fileUpload = require('express-fileupload');

export const uploadRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

uploadRouter.route('/:tipo/:id')
    .put(fileUpload(), adminPolicy, uploadController.update);