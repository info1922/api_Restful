import { ADMIN_ROLE } from "../resources/usuario/usuario.model";

export const isAdmin = (req, res, next) => {
    if (req.currentUser.role !== 2) {
        return res.json({ err: 'Acceso no autorizado, no eres un administrador' });
    }
    next();
};