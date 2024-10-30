class AddTypeToPhases < ActiveRecord::Migration[7.1]
  def up
    add_column :phases, :type, :string
    remove_column :phases, :phase_type
    add_index :phases, :type
  end

  def down
    add_column :phases, :phase_type, :string
    remove_column :phases, :type
    remove_index :phases, :type
  end
end
