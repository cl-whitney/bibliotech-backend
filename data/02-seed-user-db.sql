BEGIN;

-- Insert users
INSERT INTO "user" (first_name, last_name, password, email, role)
VALUES
('Liam', 'Vernon', 'password123', 'liam@example.com', 'admin'),
('Noah', 'Chevalier', 'password123', 'noah@example.com', 'member'),
('Emma', 'Fontaine', 'password123', 'emma@example.com', 'member'),
('Zoe', 'Clément', 'password123', 'zoe@example.com', 'member'),
('Mila', 'Dubois', 'password123', 'mila@example.com', 'member');

COMMIT;