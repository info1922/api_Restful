import usuarioService from "./usuario.service";
import User, { USER_ROLE } from './usuario.model';
import jwt from "../../helpers/jwt";


/* jshint ignore:start */
export default {

    async signup(req, res) {

        try {

            const { value, error } = usuarioService.validateSignup(req.body);

            if (error) {
                return res.status(400).json(error);
            }

            const encryptPass = usuarioService.encryptPassword(value.password);

            // Validar si ya existe un usuario
            const existeUser = await User.findOne({ 'local.email': value.email });

            if (existeUser) {
                return res.status(500).json({ mensaje: 'Ya existe una cuenta con este correo' });
            }

            const user = await new User();
            user.local.email = value.email;
            user.nombre = value.nombre;
            user.apellido = value.apellido;
            user.local.password = encryptPass;
            user.role = value.role || USER_ROLE;

            await user.save();

            return res.status(200).json({ ok: true, user });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, error });
        }

    },

    async login(req, res) {
        try {

            const { value, error } = usuarioService.validateLogin(req.body);

            if (error) {
                return res.status(400).json(error);
            }

            const user = await User.findOne({ 'local.email': value.email });

            // Si el email no existe
            if (!user) {
                return res.status(401).json({ ok: false, err: 'Correo o contraseña incorrectos' });
            }

            const autenticacion = usuarioService.comparePassword(value.password, user.local.password);

            // Si las contraseñas no coinciden
            if (!autenticacion) {
                return res.status(401).json({ ok: false, err: 'Correo o contraseña incorrectos' });
            }

            const token = jwt.issue({ id: user._id }, '1d');

            return res.status(200).json({ user, token }); // Jwt token

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, error });
        }
    },

    autenticacion(req, res) {
        return res.send(true);
    }

};