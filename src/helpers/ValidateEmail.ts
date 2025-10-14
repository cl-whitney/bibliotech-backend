/**
 * This function validates emails and returns an array with the different parts of the email if it is correct, otherwise it returns null.
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
 * @param {string} email
 * @returns {RegExpMatchArray|null}
 */
import validator from "validator";

/**
 * This function validates emails using the 'validator' library.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

export default validateEmail;