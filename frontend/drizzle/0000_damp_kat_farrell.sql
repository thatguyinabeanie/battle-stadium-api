-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"providerAccountId" varchar NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" bigint,
	"id_token" text,
	"scope" text,
	"session_state" text,
	"token_type" text,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"round_id" bigint NOT NULL,
	"table_number" integer,
	"player_one_id" bigint NOT NULL,
	"player_two_id" bigint NOT NULL,
	"winner_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"player_one_check_in" timestamp(6),
	"player_two_check_in" timestamp(6),
	"loser_id" bigint,
	"reported_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_games" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"match_id" bigint NOT NULL,
	"winner_id" bigint,
	"loser_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"game_number" integer DEFAULT 1 NOT NULL,
	"reporter_id" bigint,
	"reported_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_staff_members" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"organization_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phases" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tournament_id" bigint NOT NULL,
	"number_of_rounds" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"type" varchar NOT NULL,
	"name" varchar,
	"best_of" integer DEFAULT 3 NOT NULL,
	"started_at" timestamp(6),
	"ended_at" timestamp(6),
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"owner_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament_formats" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tournament_id" bigint NOT NULL,
	"format_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"expires" timestamp(6) NOT NULL,
	"sessionToken" varchar NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"phase_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"round_number" integer DEFAULT 1 NOT NULL,
	"started_at" timestamp(6),
	"ended_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_teams" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"ability" varchar,
	"tera_type" varchar,
	"nature" varchar,
	"held_item" varchar,
	"move1" varchar,
	"move2" varchar,
	"move3" varchar,
	"move4" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"nickname" varchar,
	"pokemon_team_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"start_at" timestamp(6),
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"organization_id" bigint,
	"check_in_start_at" timestamp(6),
	"game_id" bigint,
	"format_id" bigint,
	"ended_at" timestamp(6),
	"registration_start_at" timestamp(6),
	"registration_end_at" timestamp(6),
	"player_cap" integer,
	"autostart" boolean DEFAULT false NOT NULL,
	"started_at" timestamp(6),
	"late_registration" boolean DEFAULT true NOT NULL,
	"teamlists_required" boolean DEFAULT true NOT NULL,
	"open_team_sheets" boolean DEFAULT true NOT NULL,
	"end_at" timestamp(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"[:identifier, :token]" bigserial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"expires" timestamp(6) NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "formats" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar,
	"game_id" bigint,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"tournament_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"team_sheet_submitted" boolean DEFAULT false NOT NULL,
	"checked_in_at" timestamp,
	"in_game_name" varchar DEFAULT '' NOT NULL,
	"pokemon_team_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar DEFAULT '' NOT NULL,
	"username" varchar DEFAULT '',
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL,
	"encrypted_password" varchar DEFAULT '' NOT NULL,
	"reset_password_token" varchar,
	"reset_password_sent_at" timestamp(6),
	"remember_created_at" timestamp(6),
	"sign_in_count" integer DEFAULT 0 NOT NULL,
	"current_sign_in_at" timestamp(6),
	"last_sign_in_at" timestamp(6),
	"current_sign_in_ip" varchar,
	"last_sign_in_ip" varchar,
	"confirmation_token" varchar,
	"confirmed_at" timestamp(6),
	"confirmation_sent_at" timestamp(6),
	"unconfirmed_email" varchar,
	"failed_attempts" integer DEFAULT 0 NOT NULL,
	"unlock_token" varchar,
	"locked_at" timestamp(6),
	"first_name" varchar,
	"last_name" varchar,
	"pronouns" varchar,
	"jti" varchar DEFAULT 'invalid' NOT NULL,
	"name" varchar,
	"emailVerified" timestamp(6),
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phase_players" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"player_id" bigint NOT NULL,
	"phase_type" varchar NOT NULL,
	"phase_id" bigint NOT NULL,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema_migrations" (
	"version" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" varchar,
	"created_at" timestamp(6) NOT NULL,
	"updated_at" timestamp(6) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_973a5646ac" FOREIGN KEY ("loser_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_bfcd6a3c9f" FOREIGN KEY ("player_one_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_b58c6c3513" FOREIGN KEY ("player_two_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_9d0deeb219" FOREIGN KEY ("winner_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "fk_rails_e7c0250650" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_76cefaebc0" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_a2c90fc36d" FOREIGN KEY ("loser_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_be3d6ef1eb" FOREIGN KEY ("winner_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_games" ADD CONSTRAINT "fk_rails_85619f44a8" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_staff_members" ADD CONSTRAINT "fk_rails_a177a0142c" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_staff_members" ADD CONSTRAINT "fk_rails_65be078ae6" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phases" ADD CONSTRAINT "fk_rails_75e775589e" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "fk_rails_ab574863f6" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_formats" ADD CONSTRAINT "fk_rails_08c15d3c37" FOREIGN KEY ("format_id") REFERENCES "public"."formats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_formats" ADD CONSTRAINT "fk_rails_c679052dc0" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_teams" ADD CONSTRAINT "fk_rails_f36f55a08c" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "fk_rails_5b6022737b" FOREIGN KEY ("pokemon_team_id") REFERENCES "public"."pokemon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "fk_rails_8ef7ba6258" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "fk_rails_325ccadea6" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "formats" ADD CONSTRAINT "fk_rails_a0e0605606" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_aeec102047" FOREIGN KEY ("pokemon_team_id") REFERENCES "public"."pokemon_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_f96ec8a72f" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "fk_rails_224cac07ce" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phase_players" ADD CONSTRAINT "fk_rails_71fbe65d92" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_accounts_on_provider_and_providerAccountId" ON "accounts" USING btree ("provider","providerAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_accounts_on_userId" ON "accounts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_loser_id" ON "matches" USING btree ("loser_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_player_one_id" ON "matches" USING btree ("player_one_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_player_two_id" ON "matches" USING btree ("player_two_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_matches_on_round_and_players_unique" ON "matches" USING btree ("round_id","player_one_id","player_two_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_matches_on_winner_id" ON "matches" USING btree ("winner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_loser_id" ON "match_games" USING btree ("loser_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_match_id" ON "match_games" USING btree ("match_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_reporter_id" ON "match_games" USING btree ("reporter_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_match_games_on_winner_id" ON "match_games" USING btree ("winner_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_games_on_lower_name" ON "games" USING btree (lower((name)::text));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_organization_staff_members_on_organization_id" ON "organization_staff_members" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_organization_staff_members_on_user_id" ON "organization_staff_members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phases_on_tournament_id" ON "phases" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phases_on_type" ON "phases" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_organizations_on_name" ON "organizations" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_organizations_on_owner_id" ON "organizations" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_formats_on_format_id" ON "tournament_formats" USING btree ("format_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_formats_on_tournament_id" ON "tournament_formats" USING btree ("tournament_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_sessions_on_sessionToken" ON "sessions" USING btree ("sessionToken");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_sessions_on_userId" ON "sessions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_rounds_on_phase_id" ON "rounds" USING btree ("phase_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_rounds_on_phase_id_and_round_number" ON "rounds" USING btree ("phase_id","round_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_pokemon_teams_on_user_id" ON "pokemon_teams" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_pokemon_on_pokemon_team_id" ON "pokemon" USING btree ("pokemon_team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_format_id" ON "tournaments" USING btree ("format_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_game_id" ON "tournaments" USING btree ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_tournaments_on_name_and_organization_id" ON "tournaments" USING btree ("name","organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_tournaments_on_org_id_name_start_date" ON "tournaments" USING btree ("organization_id","name","start_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournaments_on_organization_id" ON "tournaments" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_verification_tokens_on_identifier_and_token" ON "verification_tokens" USING btree ("identifier","token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_formats_on_game_id" ON "formats" USING btree ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_formats_on_name_and_game_id" ON "formats" USING btree ("name","game_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_on_user_id_and_tournament_id" ON "players" USING btree ("user_id","tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_pokemon_team_id" ON "players" USING btree ("pokemon_team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_tournament_id" ON "players" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_players_on_user_id" ON "players" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_confirmation_token" ON "users" USING btree ("confirmation_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_jti" ON "users" USING btree ("jti");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_reset_password_token" ON "users" USING btree ("reset_password_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_unlock_token" ON "users" USING btree ("unlock_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "index_users_on_username" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_phase_players_on_player_id" ON "phase_players" USING btree ("player_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "index_tournament_phase_players_on_phase" ON "phase_players" USING btree ("phase_type","phase_id");
*/