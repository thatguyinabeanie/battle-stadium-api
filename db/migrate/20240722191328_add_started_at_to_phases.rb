class AddStartedAtToPhases < ActiveRecord::Migration[7.1]
  def change
    add_column :phases, :started_at, :datetime
  end
end
