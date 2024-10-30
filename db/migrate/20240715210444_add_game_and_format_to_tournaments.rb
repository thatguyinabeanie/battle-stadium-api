class AddGameAndFormatToTournaments < ActiveRecord::Migration[7.1]
  def change
    # Adds a reference to the games table. This will automatically use the `game_id` column name.
    add_reference :tournaments, :game, null: true, foreign_key: true

    # Adds a reference to the tournament_formats table. This will automatically use the `tournament_format_id` column name.
    add_reference :tournaments, :tournament_format, null: true, foreign_key: true
  end
end
