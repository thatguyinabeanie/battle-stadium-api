class ChangeBigintsToIntegers < ActiveRecord::Migration[7.2]
   def change
    # Change columns in accounts table
    change_column :accounts, :default_profile_id, :integer

    # Change columns in chat_messages table
    change_column :chat_messages, :match_id, :integer
    change_column :chat_messages, :account_id, :integer
    change_column :chat_messages, :profile_id, :integer

    # Change columns in clerk_users table
    change_column :clerk_users, :account_id, :integer

    # Change columns in formats table
    change_column :formats, :game_id, :integer

    # Change columns in match_games table
    change_column :match_games, :match_id, :integer
    change_column :match_games, :winner_id, :integer
    change_column :match_games, :loser_id, :integer
    change_column :match_games, :reporter_profile_id, :integer

    # Change columns in matches table
    change_column :matches, :round_id, :integer
    change_column :matches, :player_one_id, :integer
    change_column :matches, :player_two_id, :integer
    change_column :matches, :winner_id, :integer
    change_column :matches, :loser_id, :integer
    change_column :matches, :tournament_id, :integer
    change_column :matches, :phase_id, :integer
    change_column :matches, :reset_by_id, :integer

    # Change columns in organization_staff_members table
    change_column :organization_staff_members, :organization_id, :integer
    change_column :organization_staff_members, :account_id, :integer

    # Change columns in organizations table
    change_column :organizations, :limitless_org_id, :integer
    change_column :organizations, :owner_id, :integer

    # Change columns in phase_players table
    change_column :phase_players, :player_id, :integer
    change_column :phase_players, :phase_id, :integer

    # Change columns in phases table
    change_column :phases, :tournament_id, :integer
    change_column :phases, :current_round_id, :integer

    # Change columns in players table
    change_column :players, :tournament_id, :integer
    change_column :players, :pokemon_team_id, :integer
    change_column :players, :account_id, :integer
    change_column :players, :profile_id, :integer

    # Change columns in pokemon table
    change_column :pokemon, :pokemon_team_id, :integer

    # Change columns in pokemon_teams table
    change_column :pokemon_teams, :format_id, :integer
    change_column :pokemon_teams, :game_id, :integer
    change_column :pokemon_teams, :profile_id, :integer

    # Change columns in profiles table
    change_column :profiles, :account_id, :integer

    # Change columns in rk9_tournaments table
    change_column :rk9_tournaments, :id, :integer

    # Change columns in rounds table
    change_column :rounds, :phase_id, :integer

    # Change columns in tournament_formats table
    change_column :tournament_formats, :tournament_id, :integer
    change_column :tournament_formats, :format_id, :integer

    # Change columns in tournaments table
    change_column :tournaments, :organization_id, :integer
    change_column :tournaments, :game_id, :integer
    change_column :tournaments, :format_id, :integer
    change_column :tournaments, :limitless_id, :integer
    change_column :tournaments, :current_phase_id, :integer
  end
end
