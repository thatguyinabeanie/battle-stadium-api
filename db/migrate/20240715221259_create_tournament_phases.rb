class CreateTournamentPhases < ActiveRecord::Migration[7.1]
  def change
    create_table :tournament_phases do |t|
      t.bigint :tournament_id, null: false
      t.bigint :phase_id, null: false

      t.timestamps
    end

    add_index :tournament_phases, :tournament_id
    add_index :tournament_phases, :phase_id
    # If you want to ensure that the combination of tournament_id and phase_id is unique
    add_index :tournament_phases, %i[tournament_id phase_id], unique: true

    # Add foreign keys for referential integrity
    add_foreign_key :tournament_phases, :tournaments
    add_foreign_key :tournament_phases, :phases
  end
end
