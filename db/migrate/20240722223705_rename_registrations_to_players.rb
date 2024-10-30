class RenameRegistrationsToPlayers < ActiveRecord::Migration[7.1]
  def change
    rename_table :registrations, :tournament_players
  end
end
