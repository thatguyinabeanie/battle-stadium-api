class DropTournamentPhases < ActiveRecord::Migration[7.1]
  def up
    execute <<-SQL.squish
      DROP TABLE tournament_phases CASCADE;
    SQL
  end

  def down
    create_table :tournament_phases do |t|
      t.string :name
      t.integer :tournament_id
      t.integer :phase_id
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      # Add other columns and indexes as necessary
    end

    add_index :tournament_phases, :phase_id, name: "index_tournament_phases_on_phase_id"
    add_index :tournament_phases, %i[tournament_id phase_id], name: "index_tournament_phases_on_tournament_id_and_phase_id", unique: true
    add_index :tournament_phases, :tournament_id, name: "index_tournament_phases_on_tournament_id"
  end
end
