class AddWinsLossesAndResistanceToPlayers < ActiveRecord::Migration[7.2]
  def change
    add_column :players, :round_wins, :integer, null: false, default: 0
    add_column :players, :round_losses, :integer, null: false, default: 0
    add_column :players, :game_wins, :integer, null: false, default: 0
    add_column :players, :game_losses, :integer, null: false, default: 0
    add_column :players, :resistance, :decimal, precision: 5, scale: 2
  end
end
