CREATE TABLE IF NOT EXISTS "indexed_urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
