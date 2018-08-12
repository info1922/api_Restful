import express from 'express';
import passport from 'passport';
import usuarioController from './usuario.controller';

export const userRouter = express.Router();
userRouter.post('/signup', usuarioController.signup);
userRouter.post('/login', usuarioController.login);
userRouter.get('/me', passport.authenticate('jwt', { session: false }), usuarioController.autenticacion);