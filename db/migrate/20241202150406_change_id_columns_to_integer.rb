class ChangeIdColumnsToInteger < ActiveRecord::Migration[7.2]
  def up
    change_column :accounts, :id, :integer, using: "id::integer"
    change_column :chat_messages, :id, :integer, using: "id::integer"
    change_column :clerk_users, :id, :integer, using: "id::integer"
    change_column :formats, :id, :integer, using: "id::integer"
    change_column :match_games, :id, :integer, using: "id::integer"
    change_column :matches, :id, :integer, using: "id::integer"
    change_column :organization_staff_members, :id, :integer, using: "id::integer"
    change_column :organizations, :id, :integer, using: "id::integer"
    change_column :phase_players, :id, :integer, using: "id::integer"
    change_column :phases, :id, :integer, using: "id::integer"
    change_column :players, :id, :integer, using: "id::integer"
    change_column :pokemon, :id, :integer, using: "id::integer"
    change_column :pokemon_teams, :id, :integer, using: "id::integer"
    change_column :profiles, :id, :integer, using: "id::integer"
    change_column :rk9_tournaments, :id, :integer, using: "id::integer"
    change_column :rounds, :id, :integer, using: "id::integer"
    change_column :tournament_formats, :id, :integer, using: "id::integer"
    change_column :tournaments, :id, :integer, using: "id::integer"
  end

  def down
    change_column :accounts, :id, :bigint, using: "id::bigint"
    change_column :chat_messages, :id, :bigint, using: "id::bigint"
    change_column :clerk_users, :id, :bigint, using: "id::bigint"
    change_column :formats, :id, :bigint, using: "id::bigint"
    change_column :match_games, :id, :bigint, using: "id::bigint"
    change_column :matches, :id, :bigint, using: "id::bigint"
    change_column :organization_staff_members, :id, :bigint, using: "id::bigint"
    change_column :organizations, :id, :bigint, using: "id::bigint"
    change_column :phase_players, :id, :bigint, using: "id::bigint"
    change_column :phases, :id, :bigint, using: "id::bigint"
    change_column :players, :id, :bigint, using: "id::bigint"
    change_column :pokemon, :id, :bigint, using: "id::bigint"
    change_column :pokemon_teams, :id, :bigint, using: "id::bigint"
    change_column :profiles, :id, :bigint, using: "id::bigint"
    change_column :rk9_tournaments, :id, :bigint, using: "id::bigint"
    change_column :rounds, :id, :bigint, using: "id::bigint"
    change_column :tournament_formats, :id, :bigint, using: "id::bigint"
    change_column :tournaments, :id, :bigint, using: "id::bigint"
  end
end
