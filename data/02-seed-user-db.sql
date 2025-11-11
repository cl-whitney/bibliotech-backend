BEGIN;

INSERT INTO "user" (first_name, last_name, password, email, role)
VALUES
('Liam', 'Vernon', '6c27ffaf8246e8e47d228034e873d5bb4714ac0973a48283c1c1ef9f47a0454c65e9a335f6ce1b7aad5ca0d60fcc67d7ac604978fae7ea7956c35813c694c170.d207b1dfb05da7880310d1ca90cd1dc8', 'liam@example.com', 'admin'),
('Noah', 'Chevalier', '5688730c358175a40d3c741db8804a8a7b9311eba4c21433f7ee7bc839ebd4601c8a683961a7c0fe5b6241919d1cd399b3d304f3ab14aa429f7495a613ccfb69.c893e9e9d8b6311f4ff8bc3dad2ca485', 'noah@example.com', 'member'),
('Emma', 'Fontaine', '5688730c358175a40d3c741db8804a8a7b9311eba4c21433f7ee7bc839ebd4601c8a683961a7c0fe5b6241919d1cd399b3d304f3ab14aa429f7495a613ccfb69.c893e9e9d8b6311f4ff8bc3dad2ca485', 'emma@example.com', 'member'),
('Zoe', 'Clément', '5688730c358175a40d3c741db8804a8a7b9311eba4c21433f7ee7bc839ebd4601c8a683961a7c0fe5b6241919d1cd399b3d304f3ab14aa429f7495a613ccfb69.c893e9e9d8b6311f4ff8bc3dad2ca485', 'zoe@example.com', 'member'),
('Mila', 'Dubois', '5688730c358175a40d3c741db8804a8a7b9311eba4c21433f7ee7bc839ebd4601c8a683961a7c0fe5b6241919d1cd399b3d304f3ab14aa429f7495a613ccfb69.c893e9e9d8b6311f4ff8bc3dad2ca485', 'mila@example.com', 'member');

COMMIT;