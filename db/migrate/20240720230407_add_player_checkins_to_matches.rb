class AddPlayerCheckinsToMatches < ActiveRecord::Migration[7.1]
  def change
    add_column :matches, :player1_check_in, :datetime, null: true, default: nil
    add_column :matches, :player2_check_in, :datetime, null: true, default: nil
  end
end
