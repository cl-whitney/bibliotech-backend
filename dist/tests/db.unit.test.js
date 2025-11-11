import { client } from '../src/database/client.js';
import userDatamapper from '../src/datamappers/userDatamapper.js';
/* Test unitaire :
 * Sur le UserDatamapper.findAllUsers()
 * On mocke client.query pour ne pas toucher la vraie BDD */
jest.mock('../src/database/client.js', () => ({
    client: { query: jest.fn() }
}));
describe('userDatamapper.findAllUsers()', () => {
    beforeEach(() => {
        client.query.mockReset();
    });
    it('Renvoie bien les lignes récupérées', async () => {
        const fakeRows = [
            { id: 1, first_name: 'Alice', last_name: 'Dupont', email: 'a@b.com', password: '', role: 'member', status: true, created_at: new Date() }
        ];
        client.query.mockResolvedValue({ rows: fakeRows });
        const users = await userDatamapper.findAllUsers();
        expect(client.query).toHaveBeenCalledWith('SELECT * FROM "user" WHERE status = true');
        expect(users).toEqual(fakeRows);
    });
    it('Renvoie un tableau vide si aucune ligne', async () => {
        client.query.mockResolvedValue({ rows: [] });
        const users = await userDatamapper.findAllUsers();
        expect(users).toEqual([]);
    });
});
