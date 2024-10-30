class AddBestOfToPhases < ActiveRecord::Migration[7.1]
  def change
    add_column :phases, :best_of, :integer, default: 3, null: false
  end
end
