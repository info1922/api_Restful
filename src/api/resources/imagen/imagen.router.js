import express from 'express';
import imagenController from './imagen.controller';
var fileUpload = require('express-fileupload');

export const imagenRouter = express.Router();

imagenRouter.route('/:tipo/:id')
    .get(fileUpload(), imagenController.getAll);