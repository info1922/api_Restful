import express from 'express';
import { materialRouter } from './material';
import { userRouter } from './usuario/usuario.router';
import { authRouter } from './auth';
import { lugarListRouter } from './lugar';
import { uploadRouter } from './upload/upload.router';
import { generaRouter } from './gereraPDF/genera.router';
import { imagenRouter } from './imagen/imagen.router';

export const restRouter = express.Router();
restRouter.use('/material', materialRouter);
restRouter.use('/users', userRouter);
restRouter.use('/lugar', lugarListRouter);
restRouter.use('/upload', uploadRouter);
restRouter.use('/pdf', generaRouter);
restRouter.use('/imagen', imagenRouter);
restRouter.use('/auth', authRouter);