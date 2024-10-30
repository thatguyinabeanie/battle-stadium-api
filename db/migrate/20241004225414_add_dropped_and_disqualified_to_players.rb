class AddDroppedAndDisqualifiedToPlayers < ActiveRecord::Migration[7.2]
  def change
    add_column :players, :dropped, :boolean, default: false, null: false
    add_column :players, :disqualified, :boolean, default: false, null: false
  end
end
