import passwordValidator from "password-validator";
import userDatamapper from "../datamappers/userDatamapper.js";
import Scrypt from "../helpers/scrypt.js";
import { generateAuthenticationToken } from "../helpers/token.js";
import validateEmail from "../helpers/validateEmail.js";
const loginController = {
    async login(req, res, _next) {
        const { email, password } = req.body;
        const errors = [];
        // Password validation
        const schema = new passwordValidator();
        schema
            .is()
            .min(8)
            .has()
            .uppercase()
            .has()
            .lowercase()
            .has()
            .digits(1)
            .has()
            .not()
            .spaces()
            .is()
            .not()
            .oneOf(["Passw0rd", "Password123"]);
        // Email validation
        if (!validateEmail(email)) {
            errors.push("Le format de l'email est invalide");
        }
        // Password schema validation
        if (!schema.validate(password)) {
            errors.push("Email ou mot de passe incorrect");
        }
        // Find user by email
        const user = await userDatamapper.findUserByEmail(email);
        if (!user) {
            errors.push("Email ou mot de passe incorrect");
        }
        // Compare password
        let ok = false;
        if (user) {
            ok = await Scrypt.compare(password, user.password);
        }
        if (!ok) {
            errors.push("Email ou mot de passe incorrect");
        }
        if (errors.length) {
            res.status(400).json({ errors });
            return;
        }
        // Remove password from user object
        if (user) {
            user.password = "";
        }
        // Generate token
        const token = user
            ? generateAuthenticationToken({ id: user.id, email: user.email })
            : "";
        res.status(200).json({
            message: "Connexion réussie",
            user,
            token,
        });
    },
    /**
     * La déconnexion côté JWT est gérée uniquement par le client.
     * Il suffit pour le frontend de supprimer le token du localStorage (ou du cookie).
     * Cette route ne fait que confirmer que l'utilisateur "a été déconnecté".
     */
    async logout(_, res, _next) {
        res.status(200).json({ message: "Déconnexion réussie (client)" });
    },
};
export default loginController;
