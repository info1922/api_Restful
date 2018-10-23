import express from 'express';
import passport from 'passport';
import authController from './auth.controller';
import { isAdmin } from '../../middlewares/is-admin';

export const authRouter = express.Router();

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];

authRouter.get('/google', passport.authenticate('google', {
    // scope: ['https://www.googleapis.com/auth/plus.login']
    scope: ['profile', 'email']
}));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    authController.sendJWTToken
);

authRouter.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

authRouter.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/failure' }),
    authController.sendJWTToken
);

authRouter.get('/renuevatoken', adminPolicy, authController.renuevaToken);

authRouter.get('/authenticate', passport.authenticate('jwt', { session: false }), authController.authenticate);