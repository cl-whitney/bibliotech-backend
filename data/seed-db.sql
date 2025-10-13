BEGIN;

-- Insert languages
INSERT INTO language (name, slug)
VALUES
('JavaScript', 'javascript'),
('TypeScript', 'typescript'),
('Python', 'python'),
('Java', 'java'),
('C#', 'csharp'),
('C++', 'cpp'),
('C', 'c'),
('Go', 'go'),
('Ruby', 'ruby'),
('PHP', 'php'),
('Rust', 'rust'),
('Kotlin', 'kotlin'),
('Swift', 'swift'),
('SQL', 'sql'),
('HTML', 'html'),
('CSS', 'css'),
('Shell', 'shell'),
('Perl', 'perl'),
('Markdown', 'markdown'),
('JSON', 'json'),
('YAML', 'yaml'),
('Dockerfile', 'dockerfile'),
('GraphQL', 'graphql'),
('Lua', 'lua'),
('R', 'r'),
('Scala', 'scala'),
('Haskell', 'haskell'),
('Elixir', 'elixir'),
('Sass', 'sass'),
('Less', 'less');


-- Insert tags
INSERT INTO tag (name)
VALUES
('frontend'), ('backend'), ('api'), ('database'), ('security'), ('devops');

-- Insert snippets
INSERT INTO snippet (title, description, code, language_id, user_id)
VALUES
('Hello World JS', 'Print Hello World in JavaScript', 'console.log("Hello World");', 1, 1),
('Fibonacci TS', 'Fibonacci sequence in TypeScript', 'function fib(n: number): number { return n <= 1 ? n : fib(n-1)+fib(n-2); }', 2, 2),
('Select DB', 'Basic SQL select example', 'SELECT * FROM users;', 14, 3);

-- Link snippets and tags
INSERT INTO snippets_Has_tags (snippet_id, tag_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 4);

COMMIT;