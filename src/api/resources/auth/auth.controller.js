import jwt from 'jsonwebtoken';
import { devConfig } from './../config/env/development';

export default {
    sendJWTToken(req, res) {
        console.log(req.currentUser.id);
        const token = jwt.sign({ id: req.currentUser.id }, devConfig.secret, { expiresIn: '1d' });

        return res.json({ ok: true, token }); // Jwt token
        // res.redirect(`${devConfig.frontendURL}/panel/?token=${token}`);
    }
};