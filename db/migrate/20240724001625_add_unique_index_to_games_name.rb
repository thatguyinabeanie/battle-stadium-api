class AddUniqueIndexToGamesName < ActiveRecord::Migration[7.1]
  def up
    execute <<-SQL.squish
      CREATE UNIQUE INDEX index_games_on_lower_name
      ON games (LOWER(name));
    SQL
  end

  def down
    remove_index :games, name: "index_games_on_lower_name"
  end
end
