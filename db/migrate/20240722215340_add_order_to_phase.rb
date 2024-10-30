class AddOrderToPhase < ActiveRecord::Migration[7.1]
  def change
    add_column :phases, :order, :integer, null: false, default: 0
  end
end
