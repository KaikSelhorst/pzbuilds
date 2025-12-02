CREATE TABLE "mods" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" text NOT NULL,
	"is_official" boolean DEFAULT false NOT NULL,
	"steam_mod_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "steam_mods" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"tags" text[] DEFAULT '{}',
	"workshop_url" text NOT NULL,
	"last_sync" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mods" ADD CONSTRAINT "mods_steam_mod_id_steam_mods_id_fk" FOREIGN KEY ("steam_mod_id") REFERENCES "public"."steam_mods"("id") ON DELETE cascade ON UPDATE no action;