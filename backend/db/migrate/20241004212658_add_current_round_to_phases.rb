class AddCurrentRoundToPhases < ActiveRecord::Migration[7.2]
  def change
    add_reference :phases, :current_round, foreign_key: { to_table: :rounds }
  end
end
