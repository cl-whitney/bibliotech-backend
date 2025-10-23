import type { NextFunction, Request, Response } from "express";
import type { Role } from "../types/types.js";

import type { SessionUser } from "../types/express-session.js";

declare module "express-session" {
	interface SessionData {
		user?: SessionUser;
	}
}

function initUserSession(
	req: Request,
	res: Response,
	_next: NextFunction,
): void {
	let user = null;

	if (req.session?.user) {
		user = req.session.user;
	}

	res.locals.user = user;

	_next();
}

export default initUserSession;
