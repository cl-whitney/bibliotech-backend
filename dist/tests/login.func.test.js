import request from 'supertest';
import app from '../src/index-test.js';
/** Test fonctionnel :
 * - Vérifie le fonctionnement de la route /api/auth/login
 * - Interagit avec l'application Express complète */
describe('Auth login', () => {
    it('récupère un token JWT', async () => {
        const loginData = {
            email: 'mila@example.com',
            password: 'MonSuperMdpAdmin321!'
        };
        const res = await request(app)
            .post('/api/auth/login')
            .send(loginData);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    }, 15000);
});
