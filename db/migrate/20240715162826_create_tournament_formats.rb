class CreateTournamentFormats < ActiveRecord::Migration[7.1]
  def change
    create_table :tournament_formats do |t|
      t.string :name
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
