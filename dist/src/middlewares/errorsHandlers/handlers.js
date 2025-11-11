/**
 * Wraps an Express request handler to catch any errors and pass them to the next middleware.
 *
 * @param funcToExecute - The Express request handler function to execute.
 * @returns A new request handler that catches errors and forwards them to Express error handling middleware.
 */
function catchErrors(funcToExecute) {
	return async (req, res, next) => {
		try {
			await funcToExecute(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
/**
 * Express middleware for handling errors and sending a standardized JSON response.
 *
 * @param err - The error object, expected to be of type `ServerError` with optional `statusCode` and `message` properties.
 * @param _req - The Express request object (unused).
 * @param res - The Express response object used to send the error response.
 * @param _next - The Express next middleware function (unused).
 *
 * @remarks
 * If `err.statusCode` is not provided, defaults to HTTP 500.
 * If `err.message` is not provided, returns a generic French error message.
 */
function errorHandler(err, _req, res, _next) {
	const status = err.statusCode || 500;
	res.status(status).json({
		message: err.message || "Une erreur inconnue s'est produite",
		statusCode: status,
	});
}
export { errorHandler, catchErrors };
