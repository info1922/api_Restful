import express from 'express';
import { songRouter } from './song';
import { userRouter } from './usuario/usuario.router';
import { authRouter } from './auth';
import { lugarListRouter } from './lugar';


export const restRouter = express.Router();
restRouter.use('/songs', songRouter);
restRouter.use('/users', userRouter);
restRouter.use('/lugar', lugarListRouter);
restRouter.use('/auth', authRouter);