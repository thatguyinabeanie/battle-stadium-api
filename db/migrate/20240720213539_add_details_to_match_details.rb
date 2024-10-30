class AddDetailsToMatchDetails < ActiveRecord::Migration[7.1]
  def change
    add_column :match_details, :game_number, :integer
    add_column :match_details, :player1_check_in, :datetime
    add_column :match_details, :player2_check_in, :datetime
    add_reference :match_details, :score_reporter, null: true, foreign_key: { to_table: :users }
  end
end
