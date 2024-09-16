class AddInGameNameToPlayers < ActiveRecord::Migration[7.1]
  def change
    add_column :players, :in_game_name, :string, null: false, default: ""
  end
end
