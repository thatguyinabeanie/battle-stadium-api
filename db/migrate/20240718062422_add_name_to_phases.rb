class AddNameToPhases < ActiveRecord::Migration[7.1]
  def change
    add_column :phases, :name, :string
  end
end
