import express from 'express';
import { materialRouter } from './material';
import { userRouter } from './usuario/usuario.router';
import { authRouter } from './auth';
import { lugarListRouter } from './lugar';


export const restRouter = express.Router();
restRouter.use('/material', materialRouter);
restRouter.use('/users', userRouter);
restRouter.use('/lugar', lugarListRouter);
restRouter.use('/auth', authRouter);