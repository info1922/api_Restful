import jwt from 'jsonwebtoken';
import { devConfig } from './../config/env/development';
var moment = require('moment');

var expires = moment().add(30, 'days').valueOf();

export default {



    sendJWTToken(req, res) {
        console.log(req.currentUser.id);
        const token = jwt.sign({ id: req.currentUser.id }, devConfig.secret, { expiresIn: expires });

        // return res.json({ ok: true, token }); // Jwt token
        res.redirect(`${devConfig.frontendURL}/panel/?token=${token}`);
    },
    authenticate(req, res) {
        return res.send(true);
    },

    renuevaToken(req, res) {
        const token = jwt.sign({ id: req.currentUser }, devConfig.secret, { expiresIn: '5d' });
        res.status(200).json({
            ok: true,
            token: token
        });
    }
};