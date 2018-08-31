import express from 'express';
import passport from 'passport';
import generaController from './genera.controller';

export const generaRouter = express.Router();

generaRouter.route('/')
    .get(generaController.getMateriales);