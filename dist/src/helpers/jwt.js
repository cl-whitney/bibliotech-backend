/**
 * Configuration object for JWT authentication.
 * Contains settings for access token generation and validation, such as type, algorithm, secret, expiration, audience, and issuer.
 */
const auth = {
    accessToken: {
        // Token format (often "Bearer")
        type: process.env.ACCESS_TOKEN_TYPE || "Bearer",
        // Algorithm used to sign JWT tokens
        algorithm: process.env.ACCESS_TOKEN_ALGORITHM || "HS256",
        // Secret key used to sign/validate JWTs
        secret: process.env.ACCESS_TOKEN_SECRET || "Acc3ssTok3nS3c3t!",
        // Token lifetime (in milliseconds here: 1h)
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN_MS) || 60 * 60 * 1000,
        // Indicates who the token is intended for (useful if multiple services consume your API)
        audience: process.env.ACCESS_TOKEN_AUDIENCE || "bibliotech_frontend",
        // Identifies the service that generated the token
        issuer: process.env.ACCESS_TOKEN_ISSUER || "bibliotech_frontend_api",
    },
};
export default auth;
