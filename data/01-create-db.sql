BEGIN;

-- Drop tables
DROP TABLE IF EXISTS snippets_has_tags CASCADE;
DROP TABLE IF EXISTS snippet CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS language CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Drop ENUM
DROP TYPE IF EXISTS user_role CASCADE;

-- Drop domain
DROP DOMAIN IF EXISTS email;

-- Create email domain
CREATE DOMAIN email AS text
CHECK (
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

-- Create ENUM for roles
CREATE TYPE user_role AS ENUM ('admin', 'member');

-- Create tables
CREATE TABLE "user" (
    id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name    TEXT NOT NULL,
    last_name     TEXT NOT NULL,
    password      TEXT NOT NULL,
    email         email UNIQUE NOT NULL,
    role          user_role NOT NULL DEFAULT 'member',
    status        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);

CREATE TABLE language (
    id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name          TEXT NOT NULL,
    slug          TEXT UNIQUE NOT NULL,
    status        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);

CREATE TABLE snippet (
    id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title         TEXT NOT NULL,
    description   TEXT,
    code          TEXT NOT NULL,
    language_id   INTEGER REFERENCES language(id) ON DELETE SET NULL,
    user_id       INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    status        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);

CREATE TABLE tag (
    id            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name          TEXT UNIQUE NOT NULL,
    status        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);

CREATE TABLE snippets_has_tags (
    snippet_id    INTEGER REFERENCES snippet(id) ON DELETE CASCADE,
    tag_id        INTEGER REFERENCES tag(id) ON DELETE CASCADE,
    PRIMARY KEY (snippet_id, tag_id),
    status        BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);

COMMIT;
