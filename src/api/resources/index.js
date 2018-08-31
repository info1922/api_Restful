import express from 'express';
import { materialRouter } from './material';
import { userRouter } from './usuario/usuario.router';
import { authRouter } from './auth';
import { lugarListRouter } from './lugar';
import { uploadRouter } from './upload/upload.router';
import { generaRouter } from './gereraPDF/genera.router';


export const restRouter = express.Router();
restRouter.use('/material', materialRouter);
restRouter.use('/users', userRouter);
restRouter.use('/lugar', lugarListRouter);
restRouter.use('/upload', uploadRouter);
restRouter.use('/pdf', generaRouter);
restRouter.use('/auth', authRouter);