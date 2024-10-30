class RemoveCriteriaFromPhases < ActiveRecord::Migration[7.1]
  def change
    remove_column :phases, :criteria, :string
  end
end
