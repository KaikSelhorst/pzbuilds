CREATE TABLE "traits" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"cost" integer NOT NULL,
	"type" text NOT NULL,
	"tags" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"mod_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "traits" ADD CONSTRAINT "traits_mod_id_mods_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "mods"("id") ON DELETE CASCADE;