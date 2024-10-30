class AddEndedAtToPhases < ActiveRecord::Migration[7.1]
  def change
    add_column :phases, :ended_at, :datetime
  end
end
