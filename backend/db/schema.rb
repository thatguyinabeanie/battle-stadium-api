# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_09_041611) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "chat_messages", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "match_id", null: false
    t.uuid "user_profile_id", null: false
    t.text "content"
    t.uuid "user_id"
    t.string "message_type"
    t.datetime "sent_at"
    t.index ["match_id"], name: "index_chat_messages_on_match_id"
    t.index ["user_id"], name: "index_chat_messages_on_user_id"
    t.index ["user_profile_id"], name: "index_chat_messages_on_user_profile_id"
  end

  create_table "clerk_users", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "clerk_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clerk_user_id"], name: "index_clerk_users_on_clerk_user_id", unique: true
    t.index ["user_id"], name: "index_clerk_users_on_user_id"
  end

  create_table "formats", force: :cascade do |t|
    t.string "name"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_formats_on_game_id"
    t.index ["name", "game_id"], name: "index_formats_on_name_and_game_id", unique: true
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "lower((name)::text)", name: "index_games_on_lower_name", unique: true
  end

  create_table "match_games", force: :cascade do |t|
    t.bigint "match_id", null: false
    t.bigint "winner_id"
    t.bigint "loser_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "game_number", default: 1, null: false
    t.datetime "ended_at"
    t.uuid "reporter_id"
    t.datetime "started_at"
    t.index ["loser_id"], name: "index_match_games_on_loser_id"
    t.index ["match_id"], name: "index_match_games_on_match_id"
    t.index ["winner_id"], name: "index_match_games_on_winner_id"
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "round_id", null: false
    t.integer "table_number"
    t.bigint "player_one_id"
    t.bigint "player_two_id"
    t.bigint "winner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "player_one_check_in"
    t.datetime "player_two_check_in"
    t.bigint "loser_id"
    t.datetime "ended_at"
    t.bigint "tournament_id"
    t.bigint "phase_id"
    t.boolean "bye", default: false, null: false
    t.uuid "reset_by"
    t.index ["loser_id"], name: "index_matches_on_loser_id"
    t.index ["phase_id"], name: "index_matches_on_phase_id"
    t.index ["player_one_id"], name: "index_matches_on_player_one_id"
    t.index ["player_two_id"], name: "index_matches_on_player_two_id"
    t.index ["round_id", "player_one_id", "player_two_id"], name: "index_matches_on_round_and_players_unique", unique: true
    t.index ["tournament_id"], name: "index_matches_on_tournament_id"
    t.index ["winner_id"], name: "index_matches_on_winner_id"
  end

  create_table "organization_staff_members", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.index ["organization_id"], name: "index_organization_staff_members_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "owner_id"
    t.string "logo_url"
    t.boolean "partner", default: false, null: false
    t.boolean "hidden", default: false, null: false
    t.string "slug"
    t.bigint "limitless_org_id"
    t.index ["name"], name: "index_organizations_on_name", unique: true
    t.index ["owner_id"], name: "index_organizations_on_owner_id", unique: true, where: "(owner_id IS NOT NULL)"
    t.index ["slug"], name: "index_organizations_on_slug", unique: true
  end

  create_table "phase_players", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.string "phase_type", null: false
    t.bigint "phase_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["phase_type", "phase_id"], name: "index_tournament_phase_players_on_phase"
    t.index ["player_id"], name: "index_phase_players_on_player_id"
  end

  create_table "phases", force: :cascade do |t|
    t.bigint "tournament_id", null: false
    t.integer "number_of_rounds"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type", null: false
    t.string "name"
    t.integer "best_of", default: 3, null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.integer "order", default: 0, null: false
    t.bigint "current_round_id"
    t.index ["current_round_id"], name: "index_phases_on_current_round_id"
    t.index ["tournament_id"], name: "index_phases_on_tournament_id"
    t.index ["type"], name: "index_phases_on_type"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "tournament_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "team_sheet_submitted", default: false, null: false
    t.datetime "checked_in_at", precision: nil
    t.string "in_game_name", default: "", null: false
    t.bigint "pokemon_team_id"
    t.uuid "user_profile_id", null: false
    t.uuid "user_id", null: false
    t.boolean "dropped", default: false, null: false
    t.boolean "disqualified", default: false, null: false
    t.integer "round_wins", default: 0, null: false
    t.integer "round_losses", default: 0, null: false
    t.integer "game_wins", default: 0, null: false
    t.integer "game_losses", default: 0, null: false
    t.decimal "resistance", precision: 5, scale: 2
    t.index ["pokemon_team_id"], name: "index_players_on_pokemon_team_id"
    t.index ["tournament_id"], name: "index_players_on_tournament_id"
    t.index ["user_id", "tournament_id"], name: "index_players_on_user_id_and_tournament_id", unique: true
    t.index ["user_profile_id"], name: "index_players_on_user_profile_id"
  end

  create_table "pokemon", force: :cascade do |t|
    t.string "name"
    t.string "ability"
    t.string "tera_type"
    t.string "nature"
    t.string "held_item"
    t.string "move1"
    t.string "move2"
    t.string "move3"
    t.string "move4"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nickname"
    t.bigint "pokemon_team_id", default: 0, null: false
    t.index ["pokemon_team_id"], name: "index_pokemon_on_pokemon_team_id"
  end

  create_table "pokemon_teams", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_profile_id", null: false
  end

  create_table "profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "username", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.string "slug"
    t.index ["slug"], name: "index_profiles_on_slug", unique: true
    t.index ["user_id"], name: "index_profiles_on_user_id"
    t.index ["username"], name: "index_profiles_on_username", unique: true
  end

  create_table "rounds", force: :cascade do |t|
    t.bigint "phase_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "round_number", default: 1, null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.index ["phase_id", "round_number"], name: "index_rounds_on_phase_id_and_round_number", unique: true
    t.index ["phase_id"], name: "index_rounds_on_phase_id"
  end

  create_table "tournament_formats", force: :cascade do |t|
    t.bigint "tournament_id", null: false
    t.bigint "format_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["format_id"], name: "index_tournament_formats_on_format_id"
    t.index ["tournament_id"], name: "index_tournament_formats_on_tournament_id"
  end

  create_table "tournaments", force: :cascade do |t|
    t.string "name"
    t.datetime "start_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.datetime "check_in_start_at"
    t.bigint "game_id"
    t.bigint "format_id"
    t.datetime "ended_at"
    t.datetime "registration_start_at"
    t.datetime "registration_end_at"
    t.integer "player_cap"
    t.boolean "autostart", default: false, null: false
    t.datetime "started_at"
    t.boolean "late_registration", default: true, null: false
    t.boolean "teamlists_required", default: true, null: false
    t.boolean "open_team_sheets", default: true, null: false
    t.datetime "end_at"
    t.bigint "limitless_id"
    t.boolean "published", default: false, null: false
    t.bigint "current_phase_id"
    t.index ["current_phase_id"], name: "index_tournaments_on_current_phase_id"
    t.index ["format_id"], name: "index_tournaments_on_format_id"
    t.index ["game_id"], name: "index_tournaments_on_game_id"
    t.index ["limitless_id"], name: "index_tournaments_on_limitless_id", unique: true, where: "(limitless_id IS NOT NULL)"
    t.index ["organization_id"], name: "index_tournaments_on_organization_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "username", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "pronouns", default: "", null: false
    t.text "image_url"
    t.boolean "admin", default: false, null: false
    t.uuid "default_profile_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "chat_messages", "matches"
  add_foreign_key "chat_messages", "profiles", column: "user_profile_id"
  add_foreign_key "chat_messages", "users"
  add_foreign_key "clerk_users", "users"
  add_foreign_key "formats", "games"
  add_foreign_key "match_games", "matches"
  add_foreign_key "match_games", "players", column: "loser_id"
  add_foreign_key "match_games", "players", column: "winner_id"
  add_foreign_key "match_games", "profiles", column: "reporter_id", on_delete: :nullify
  add_foreign_key "matches", "phases"
  add_foreign_key "matches", "players", column: "loser_id"
  add_foreign_key "matches", "players", column: "player_one_id"
  add_foreign_key "matches", "players", column: "player_two_id"
  add_foreign_key "matches", "players", column: "winner_id"
  add_foreign_key "matches", "rounds"
  add_foreign_key "matches", "tournaments"
  add_foreign_key "matches", "users", column: "reset_by"
  add_foreign_key "organization_staff_members", "organizations"
  add_foreign_key "organization_staff_members", "users"
  add_foreign_key "organizations", "users", column: "owner_id"
  add_foreign_key "phase_players", "players"
  add_foreign_key "phases", "rounds", column: "current_round_id"
  add_foreign_key "phases", "tournaments"
  add_foreign_key "players", "pokemon_teams"
  add_foreign_key "players", "profiles", column: "user_profile_id"
  add_foreign_key "players", "tournaments"
  add_foreign_key "players", "users"
  add_foreign_key "pokemon", "pokemon_teams"
  add_foreign_key "pokemon_teams", "profiles", column: "user_profile_id"
  add_foreign_key "profiles", "users"
  add_foreign_key "tournament_formats", "formats"
  add_foreign_key "tournament_formats", "tournaments"
  add_foreign_key "tournaments", "games"
  add_foreign_key "tournaments", "organizations"
  add_foreign_key "tournaments", "phases", column: "current_phase_id"
  add_foreign_key "users", "profiles", column: "default_profile_id"
end
