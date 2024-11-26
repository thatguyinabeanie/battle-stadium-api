class AddIndexes < ActiveRecord::Migration[7.2]
  def change
    # Accounts table
    add_index :accounts, :archived_at  # If querying for active/archived accounts

    # Players table
    add_index :players, :checked_in_at  # For tournament check-in queries
    add_index :players, [:tournament_id, :checked_in_at]  # For checking tournament status
    add_index :players, [:tournament_id, :dropped]  # For active players in tournament
    add_index :players, [:tournament_id, :round_wins]  # For tournament standings
    add_index :players, [:tournament_id, :disqualified]  # For DQ status checks
    add_index :players, [:profile_id, :created_at]  # For player history

    # Tournaments table
    add_index :tournaments, :published  # For filtering published tournaments
    add_index :tournaments, [:organization_id, :start_at]  # For org's upcoming tournaments
    add_index :tournaments, :start_at  # For finding upcoming tournaments
    add_index :tournaments, [:game_id, :start_at]  # For game-specific tournament listings
    add_index :tournaments, [:format_id, :start_at]  # For format-specific tournament listings

    # Matches table
    add_index :matches, [:tournament_id, :ended_at]  # For tournament match history
    add_index :matches, :created_at  # For match history queries

    # Pokemon Teams table
    add_index :pokemon_teams, [:profile_id, :archived_at]  # For active teams by profile
    add_index :pokemon_teams, [:format_id, :created_at]  # For recent teams by format

    # Organizations table
    add_index :organizations, :partner  # For filtering partner orgs
    add_index :organizations, [:partner, :hidden]  # For public partner listing

    # Matches table
    add_index :matches, [:tournament_id, :table_number]  # For finding matches by table
    add_index :matches, [:tournament_id, :created_at]  # For tournament match feed

    # Pokemon table
    add_index :pokemon, :species  # For species-based searches
    add_index :pokemon, [:pokemon_team_id, :species]  # For team composition analysis

    # Chat Messages table
    add_index :chat_messages, [:match_id, :created_at]  # For message history
    add_index :chat_messages, [:profile_id, :created_at]  # For user message history

    # Phases table
    add_index :phases, [:tournament_id, :started_at]  # For active phase lookup
    add_index :phases, [:tournament_id, :type]  # For phase type filtering
    add_index :phases, [:tournament_id, :order]  # For ordering tournament phases

    # Rounds table
    add_index :rounds, [:phase_id, :round_number]  # For round ordering
  end
end
