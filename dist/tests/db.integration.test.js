import { client } from '../src/database/client.js';
import snippetDataMapper from "../src/datamappers/snippetDatamapper.js";
/** Test d'intégration :
 *  Teste les interactions entre SnippetDatamapper et la vraie BDD */
describe('Integration Snippets <-> DB', () => {
    let testUserId;
    beforeAll(async () => {
        const res = await client.query(`INSERT INTO "user" (first_name, last_name, email, password, role)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`, ['Integr', 'Test', 'integrtest@example.com', 'hashedpass', 'member']);
        testUserId = res.rows[0].id;
    });
    afterAll(async () => {
        await client.query('DELETE FROM snippet WHERE user_id = $1', [testUserId]);
        await client.query('DELETE FROM "user" WHERE id = $1', [testUserId]);
        await client.end();
    });
    it('should insert and fetch all snippets', async () => {
        const snippet = await snippetDataMapper.createSnippet({
            title: 'Integration Example',
            description: 'Integration test',
            code: 'console.log("ok");',
            language_id: 1,
            user_id: testUserId,
            status: true,
            id: 0,
            created_at: new Date()
        });
        const results = await snippetDataMapper.findAllSnippets();
        const found = results.find(s => s.title === snippet.title);
        expect(found).toBeDefined();
        expect(found?.code).toBe(snippet.code);
    });
});
