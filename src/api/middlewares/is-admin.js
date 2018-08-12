import { ADMIN_ROLE } from "../resources/usuario/usuario.model";

export const isAdmin = (req, res, next) => {
    if (req.currentUser.role !== ADMIN_ROLE) {
        return res.json({ err: 'Acceso no autorizado, no eres un administrador' });
    }
    next();
};