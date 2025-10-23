import 'dotenv/config';
import Scrypt from '../src/helpers/scrypt.js';

async function make() {
    // Admin password to hash
    // const plain = 'MonSuperMdpAdmin123!';

    // Member password to hash
    const plain = 'MonSuperMdpAdmin321!';
    const hash = Scrypt.hash(plain);

    console.log('Mot de passe en clair:', plain);
    console.log('Hash Scrypt généré:', hash);

    // Command to run this script: pnpx tsx data/hash-admin-pwd.ts

}

make();
