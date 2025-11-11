import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const Scrypt = {
	/**
	 * Hashes a password using scrypt with a random salt.
	 * @param password - The plain text password.
	 * @returns The hash in the format `${hash}.${salt}`
	 */
	hash(password, options) {
		const salt = randomBytes(16).toString("hex");
		const scryptOptions = {
			N: options?.N ?? 16384,
			maxmem: options?.maxmem ?? 67108864,
		};
		const buf = scryptSync(password, salt, 64, scryptOptions);
		return `${buf.toString("hex")}.${salt}`;
	},
	/**
	 * Compares a plain text password with a hash.
	 * @param plainTextPassword - The plain text password.
	 * @param hash - The hash to compare (format `${hash}.${salt}`).
	 * @returns true if the passwords match, otherwise false.
	 */
	compare(plainTextPassword, hash, options) {
		const [hashedPassword, salt] = hash.split(".");
		if (!hashedPassword || !salt) {
			return false;
		}
		// Validate that hashedPassword is a valid hex string
		if (
			!/^[0-9a-fA-F]+$/.test(hashedPassword) ||
			hashedPassword.length % 2 !== 0
		) {
			return false;
		}
		const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
		const scryptOptions = {
			N: options?.N ?? 16384,
			maxmem: options?.maxmem ?? 67108864,
		};
		const clearPasswordBuffer = scryptSync(
			plainTextPassword,
			salt,
			64,
			scryptOptions,
		);
		return timingSafeEqual(hashedPasswordBuf, clearPasswordBuffer);
	},
};
export default Scrypt;
