export enum Role {
	Invalide = "invalide",
	Admin = "admin",
	Member = "member",
}

export interface User {
	id: number;
	first_name: string;
	last_name: string;
	password: string;
	email: string;
	role: Role;
	status: boolean;
	created_at: Date;
	updated_at?: Date;
}

export interface Language {
	id: number;
	name: string;
	slug: string;
	status: boolean;
	created_at: Date;
	updated_at?: Date;
}

export interface Snippet {
	id: number;
	title: string;
	description?: string | null;
	code: string;
	language_id?: number | null;
	user_id: number;
	status: boolean;
	created_at: Date;
	updated_at?: Date;
}

export interface Tag {
	id: number;
	name: string;
	status: boolean;
	created_at: Date;
	updated_at?: Date;
}

export interface SnippetHasTag {
	snippet_id: number;
	tag_id: number;
	status: boolean;
	created_at: Date;
	updated_at?: Date;
}
