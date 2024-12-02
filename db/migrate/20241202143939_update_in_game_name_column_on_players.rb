class UpdateInGameNameColumnOnPlayers < ActiveRecord::Migration[7.2]
  def change
    change_column_default :players, :in_game_name, from: nil, to: nil
  end
end
