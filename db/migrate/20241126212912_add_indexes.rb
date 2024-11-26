class AddIndexes < ActiveRecord::Migration[7.2]
  def change
    # Accounts table
    add_index :accounts, :archived_at  # If querying for active/archived accounts
    add_index :accounts, :default_profile_id, unique: true
    add_index :accounts, :created_at

    # Clerk Users table
    add_index :clerk_users, [:account_id, :clerk_user_id], unique: true

    # Organizations table
    add_index :organizations, :partner  # For filtering partner orgs

    # Tournaments table
    remove_index :tournaments, :current_phase_id
    remove_index :tournaments, :game_id
    remove_index :tournaments, :format_id
    remove_index :tournaments, :organization_id
    add_index :tournaments, :published  # For filtering published tournaments
    add_index :tournaments, [:organization_id, :start_at]  # For org's upcoming tournaments
    add_index :tournaments, :start_at  # For finding upcoming tournaments
    add_index :tournaments, [:game_id, :start_at]  # For game-specific tournament listings
    add_index :tournaments, [:format_id, :start_at]  # For format-specific tournament listings

    # Players table
    add_index :players, :checked_in_at  # For tournament check-in queries
    add_index :players, [:tournament_id, :team_sheet_submitted]
    add_index :players, [:tournament_id, :checked_in_at]  # For checking tournament status
    add_index :players, [:tournament_id, :round_wins]  # For tournament standings
    add_index :players, [:tournament_id, :dropped]  # For active players in tournament
    add_index :players, [:tournament_id, :disqualified]  # For DQ status checks
    add_index :players, [:profile_id, :created_at]  # For player history
    add_index :players, [:account_id, :created_at]  # For player history

    # Pokemon Teams table
    add_index :pokemon_teams, [:profile_id, :archived_at]  # For active teams by profile
    add_index :pokemon_teams, [:format_id, :created_at]  # For recent teams by format
    add_index :pokemon_teams, [:game_id, :format_id, :created_at]
    remove_index :pokemon_teams, :format_id
    remove_index :pokemon_teams, :game_id


    # Pokemon table
    add_index :pokemon, :species  # For species-based searches
    add_index :pokemon, [:pokemon_team_id, :species]  # For team composition analysis
    remove_index :pokemon, :pokemon_team_id

    # Phases table
    remove_index :phases, :current_round_id
    remove_index :phases, :tournament_id
    add_index :phases, [:tournament_id, :order]

    # Phase Players
    remove_index :phase_players, [:phase_type, :phase_id]
    remove_index :phase_players, :player_id
    add_index :phase_players, [:phase_id, :player_id]


    # Rounds table
    add_index :rounds, :phase_id

    # Matches table
    add_index :matches, [:tournament_id, :created_at]  # For tournament match history
    add_index :matches, [:tournament_id, :phase_id, :round_id, :table_number]
    add_index :matches, :round_id
    add_index :matches, :winner_id
    add_index :matches, :loser_id
    remove_index :matches, :tournament_id
    remove_index :matches, [:round_id, :player_one_id, :player_two_id]

    # Match Games table


    # Chat Messages table
    add_index :chat_messages, [:match_id, :account_id, :sent_at]  # For message history
    add_index :chat_messages, [:match_id, :profile_id, :sent_at]  # For message history

  end
end
