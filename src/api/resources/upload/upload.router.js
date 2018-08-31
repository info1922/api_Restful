import express from 'express';
import uploadController from './upload.controller';
var fileUpload = require('express-fileupload');

export const uploadRouter = express.Router();

uploadRouter.route('/:tipo/:id')
    .put(fileUpload(), uploadController.update);