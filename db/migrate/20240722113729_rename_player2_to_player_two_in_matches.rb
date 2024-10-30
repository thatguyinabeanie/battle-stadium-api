class RenamePlayer2ToPlayerTwoInMatches < ActiveRecord::Migration[7.1]
  def change
    rename_column :matches, :player2_id, :player_two_id
  end
end
