import type { NextFunction, Request, Response } from "express";

/**
 * Represents an HTTP error with a specific status code.
 *
 * @extends Error
 * @example
 * throw new HttpError('Not Found', 404);
 */
class HttpError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

function notFound(_req: Request, _res: Response, next: NextFunction) {
	const err = new HttpError("La ressource demandée n'existe pas", 404);
	next(err);
}

export default notFound;
