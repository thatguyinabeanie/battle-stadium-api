class RenamePlayer1ToPlayerOneInMatches < ActiveRecord::Migration[7.1]
  def change
    rename_column :matches, :player1_id, :player_one_id
  end
end
