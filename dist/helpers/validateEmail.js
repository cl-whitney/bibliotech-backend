/**
 * This function validates emails and returns an array with the different parts of the email if it is correct, otherwise it returns null.
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
 * @param {string} email
 * @returns {RegExpMatchArray|null}
 */
/**
 * This function validates emails using the 'validator' library.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
}
export default validateEmail;
