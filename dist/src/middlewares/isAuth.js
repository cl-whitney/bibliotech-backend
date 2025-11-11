import { verifyJwtToken } from "../helpers/token.js";
function isAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Accès non autorisé. Token manquant." });
        return;
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
        res.status(401).json({ message: "Accès non autorisé. Token manquant." });
        return;
    }
    const decodedToken = verifyJwtToken(accessToken);
    if (!decodedToken) {
        res.status(401).json({ message: "Token invalide." });
        return;
    }
    req.user = { id: decodedToken.id, email: decodedToken.email };
    next();
}
export default isAuth;
