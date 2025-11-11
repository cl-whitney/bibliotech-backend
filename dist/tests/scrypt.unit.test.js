import Scrypt from '../src/helpers/scrypt.js';
/** Test unitaire :
 * Vérifie le comportement des méthodes hash et compare du helper Scrypt */
describe('Scrypt helper', () => {
    it('hash puis compare correctement un mot de passe', async () => {
        const plain = 'MonMotDePasse123!';
        const hash = await Scrypt.hash(plain);
        expect(hash).not.toEqual(plain);
        const ok = await Scrypt.compare(plain, hash);
        expect(ok).toBe(true);
    });
    it('échoue la comparaison si le mot de passe ne correspond pas', async () => {
        const hash = await Scrypt.hash('abc');
        const ok = await Scrypt.compare('autre', hash);
        expect(ok).toBe(false);
    });
});
