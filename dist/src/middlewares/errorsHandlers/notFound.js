/**
 * Represents an HTTP error with a specific status code.
 *
 * @extends Error
 * @example
 * throw new HttpError('Not Found', 404);
 */
class HttpError extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}
function notFound(_req, _res, next) {
	const err = new HttpError("La ressource demandée n'existe pas", 404);
	next(err);
}
export default notFound;
