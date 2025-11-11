import { Role } from "../types/types.js";
function isAdmin(req, res, next) {
    const user = req.session.user;
    if (!user || user.role !== Role.Admin) {
        res.redirect("/admin/connexion");
        return;
    }
    res.locals.user = user;
    next();
}
export default isAdmin;
