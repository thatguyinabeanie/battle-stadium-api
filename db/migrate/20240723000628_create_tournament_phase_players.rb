class CreateTournamentPhasePlayers < ActiveRecord::Migration[7.1]
  def change
    create_table :tournament_phase_players do |t|
      t.references :player, null: false, foreign_key: true
      t.references :phase, null: false, polymorphic: true

      t.timestamps
    end
  end
end
