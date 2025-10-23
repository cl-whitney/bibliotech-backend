import { verifyJwtToken } from "../helpers/token.js";
function isAuth(req, res, next) {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    if (!accessToken) {
        res.status(401).json({ message: "Accès non autorisé. Token manquant." });
        return;
    }
    const decodedToken = verifyJwtToken(accessToken);
    if (!decodedToken) {
        res.status(401).json({ status: 401, message: "Invalid access token" });
        return;
    }
    req.accessToken = decodedToken;
    next();
}
export default isAuth;
