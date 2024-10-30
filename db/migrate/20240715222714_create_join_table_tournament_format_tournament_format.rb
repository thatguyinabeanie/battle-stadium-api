class CreateJoinTableTournamentFormatTournamentFormat < ActiveRecord::Migration[7.1]
  def change
    create_join_table :tournaments, :tournament_formats do |t|
      t.index %i[tournament_id tournament_format_id]
      t.index %i[tournament_format_id tournament_id]
    end
  end
end
