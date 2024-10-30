class RenameRegistrationsToTournamentRegistrations < ActiveRecord::Migration[7.1]
  def change
    rename_table :registrations, :tournament_registrations
  end
end
