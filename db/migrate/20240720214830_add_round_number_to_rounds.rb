class AddRoundNumberToRounds < ActiveRecord::Migration[7.1]
  def change
    add_column :rounds, :round_number, :integer, null: false, default: 1
  end
end
