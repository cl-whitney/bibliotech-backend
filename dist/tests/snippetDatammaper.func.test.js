import request from "supertest";
import { client } from "../src/database/client.js";
import Scrypt from "../src/helpers/scrypt.js";
import app from "../src/index-test.js"; // ton app Express sans listen

/** Test fonctionnel :
 * - Vérifie le fonctionnement des routes CRUD de /api/snippets
 * - Interagit avec l'application Express complète */
describe("Tests fonctionnels Snippets", () => {
	let jwtToken;
	let createdSnippetId;
	let testUserId;
	const testUser = {
		first_name: "Test",
		last_name: "User",
		email: "testuser@example.com",
		password: "MotDePasse123!", // doit respecter le passwordValidator
	};
	beforeAll(async () => {
		// Supprimer l'utilisateur si existant
		await client.query('DELETE FROM "user" WHERE email = $1', [testUser.email]);
		// Hasher le mot de passe pour l'insertion
		const hashedPassword = await Scrypt.hash(testUser.password);
		const res = await client.query(
			'INSERT INTO "user" (first_name, last_name, email, password, role) VALUES ($1,$2,$3,$4,$5) RETURNING id',
			[
				testUser.first_name,
				testUser.last_name,
				testUser.email,
				hashedPassword,
				"member",
			],
		);
		testUserId = res.rows[0].id;
	});
	afterAll(async () => {
		// Nettoyer la base
		await client.query("DELETE FROM snippet WHERE user_id = $1", [testUserId]);
		await client.query('DELETE FROM "user" WHERE id = $1', [testUserId]);
		await client.end();
	});
	it("POST /auth/login -> récupère un token JWT", async () => {
		const res = await request(app)
			.post("/api/auth/login")
			.send({ email: testUser.email, password: testUser.password });
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("token.accessToken.token");
		jwtToken = res.body.token.accessToken.token;
	});
	it("GET /snippets -> accès uniquement avec token JWT et aucun snippet existant", async () => {
		// Supprimer les snippets de ce user pour tester le 404
		await client.query("DELETE FROM snippet WHERE user_id = $1", [testUserId]);
		const res = await request(app)
			.get(`/api/snippets/${testUserId}`)
			.set("Authorization", `Bearer ${jwtToken}`);
		expect(res.status).toBe(404);
	});
	it("POST /snippets -> crée un nouveau snippet", async () => {
		const newSnippet = {
			title: "Test Snippet",
			description: "Description du snippet",
			code: 'console.log("hello");',
			language_id: 1,
			tagIds: [],
			status: true,
		};
		const res = await request(app)
			.post("/api/snippets")
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(newSnippet);
		expect(res.status).toBe(201);
		expect(res.body.title).toBe(newSnippet.title);
		createdSnippetId = res.body.id;
	});
	it("PATCH /snippets/:id -> modifie un snippet existant", async () => {
		const updatedData = {
			title: "Snippet mis à jour",
			description: "Description mise à jour",
			code: 'console.log("updated");',
			language_id: 1,
			tagIds: [],
			status: true,
		};
		const res = await request(app)
			.patch(`/api/snippets/${createdSnippetId}`)
			.set("Authorization", `Bearer ${jwtToken}`)
			.send(updatedData);
		expect(res.status).toBe(200);
		expect(res.body.title).toBe(updatedData.title);
	});
	it("GET /snippets/:id -> récupère un snippet par ID", async () => {
		const res = await request(app)
			.get(`/api/snippets/${createdSnippetId}`)
			.set("Authorization", `Bearer ${jwtToken}`);
		expect(res.status).toBe(200);
		expect(res.body.id).toBe(createdSnippetId);
	});
	it("DELETE /snippets/:id -> supprime un snippet existant", async () => {
		const res = await request(app)
			.delete(`/api/snippets/${createdSnippetId}`)
			.set("Authorization", `Bearer ${jwtToken}`);
		expect(res.status).toBe(204);
	});
	it("GET /snippets -> renvoie 401 sans token", async () => {
		const res = await request(app).get("/api/snippets");
		expect(res.status).toBe(401);
	});
});
