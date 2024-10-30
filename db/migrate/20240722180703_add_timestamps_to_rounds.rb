class AddTimestampsToRounds < ActiveRecord::Migration[7.1]
  def change
    add_column :rounds, :started_at, :datetime
    add_column :rounds, :ended_at, :datetime
  end
end
