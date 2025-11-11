import type { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../helpers/token.js";
import { JwtPayload } from "../types/types.js";

function isAuth(req: Request, res: Response, next: NextFunction): void {
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

  const decodedToken = verifyJwtToken(accessToken) as JwtPayload | null;
  if (!decodedToken) {
    res.status(401).json({ message: "Token invalide." });
    return;
  }

  (req as any).user = { id: decodedToken.id, email: decodedToken.email };
  
  next();
}

export default isAuth;
