import jwt, { type Algorithm } from "jsonwebtoken";
import auth from "../helpers/jwt.js";

const { audience, expiresIn, issuer, secret, type } = auth.accessToken;

const algorithm = auth.accessToken.algorithm as Algorithm;

export function generateAuthenticationToken(user: {
	id: number;
	email: string;
}) {
	const payload = {
		id: user.id,
		email: user.email,
	};

	return {
		accessToken: {
			token: generateJwtToken(payload),
			type,
			expiresAt: createExpirationDate(expiresIn),
			expiresInSeconds: expiresIn,
		},
	};
}

export function generateJwtToken(payload: object): string {
	return jwt.sign(payload, secret, {
		algorithm,
		audience,
		expiresIn,
		issuer,
	});
}

/**
 * Verifies a JWT token and returns the decoded payload if valid, or null on failure.
 * @param token - The JWT token to verify.
 * @returns The decoded payload object if verification succeeds, or null if it fails.
 */
export function verifyJwtToken(token: string) {
	try {
		return jwt.verify(token, secret, {
			algorithms: [algorithm],
		});
	} catch (_error) {
		return null;
	}
}
function createExpirationDate(expiresIn: string | number): Date {
	const now = Date.now();

	if (typeof expiresIn === "number") {
		return new Date(now + expiresIn * 1000);
	}

	// If expiresIn is a string like '1h', '30m', etc.
	// Use the ms package logic for parsing, but here is a simple implementation:
	const match = /^(\d+)([smhd])$/.exec(expiresIn);
	if (match) {
		const value = parseInt(match[1], 10);
		const unit = match[2];
		let multiplier = 1000;
		switch (unit) {
			case "m":
				multiplier *= 60;
				break;
			case "h":
				multiplier *= 60 * 60;
				break;
			case "d":
				multiplier *= 60 * 60 * 24;
				break;
			// 's' is already seconds
		}
		return new Date(now + value * multiplier);
	}

	// Fallback: try to parse as milliseconds
	const ms = Number(expiresIn);
	if (!isNaN(ms)) {
		return new Date(now + ms);
	}

	throw new Error("Invalid expiresIn format");
}
