class CreateTournamentRounds < ActiveRecord::Migration[7.1]
  def change
    create_table :tournament_rounds do |t|
      t.references :phase, null: false, foreign_key: { to_table: :tournament_phases }
      t.timestamps
    end
  end
end
