class CreateTournamentFormatsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_table :tournament_formats do |t|
      t.references :tournament, null: false, foreign_key: { to_table: :tournaments }
      t.references :format, null: false, foreign_key: { to_table: :formats }
      t.timestamps
    end
  end
end
