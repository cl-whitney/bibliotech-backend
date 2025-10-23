import express from "express";
import "dotenv/config";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import session from "express-session";
import { setupSwagger } from "./config/swagger.js";
import router from "./routers/router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
setupSwagger(app);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "/views"));
app.use(express.static(join(__dirname, "public")));
app.use((_req, res, next) => {
	res.locals.page = null;
	next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: [
			"http://localhost:5500",
			"http://127.0.0.1:5500",
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://localhost:5174",
			"http://127.0.0.1:5174",
		],
		credentials: true,
	}),
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60,
			httpOnly: true,
		},
	}),
);
app.use(router);
const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || "http://localhost";
app.listen(port, () => {
	console.log(
		`Listening on ${base_url}:${port} || SWAGGER : ${base_url}:${port}/api-docs`,
	);
});
