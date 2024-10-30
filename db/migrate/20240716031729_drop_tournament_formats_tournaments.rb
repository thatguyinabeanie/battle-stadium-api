class DropTournamentFormatsTournaments < ActiveRecord::Migration[7.1]
  def up
    drop_table :tournament_formats_tournaments
  end

  def down
    create_table :tournament_formats_tournaments do |t|
      t.references :tournament, null: false, foreign_key: true
      t.references :format, null: false, foreign_key: true
      t.timestamps
    end
  end
end
