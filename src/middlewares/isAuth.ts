import type { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../helpers/token.js";

interface JwtPayload {
  id: number;
  email: string;
}

function isAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

  if (!accessToken) {
    res.status(401).json({ message: "Accès non autorisé. Token manquant." });
    return;
  }

  const decodedToken = verifyJwtToken(accessToken) as JwtPayload | null;
  if (!decodedToken) {
    res.status(401).json({ status: 401, message: "Invalid access token" });
    return;
  }

  // Injection de l'objet user dans la requête, avec id et email
  (req as any).user = {
    id: decodedToken.id,
    email: decodedToken.email,
  };

  next();
}

export default isAuth;


// import type { NextFunction, Request, Response } from "express";
// import { verifyJwtToken } from "../helpers/token.js";

// function isAuth(req: Request, res: Response, next: NextFunction): void {
// 	const accessToken = req.headers.authorization?.split("Bearer ")[1];

// 	if (!accessToken) {
// 		res.status(401).json({ message: "Accès non autorisé. Token manquant." });
// 		return;
// 	}

// 	const decodedToken = verifyJwtToken(accessToken);
// 	if (!decodedToken) {
// 		res.status(401).json({ status: 401, message: "Invalid access token" });
// 		return;
// 	}

// 	(req as any).accessToken = decodedToken;
// 	next();
// }

// export default isAuth;
