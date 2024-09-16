class AddUniqueIndexToMatches < ActiveRecord::Migration[7.1]
  def change
    add_index :matches, %i[round_id player_one_id player_two_id], unique: true, name: "index_matches_on_round_and_players_unique"
  end
end
