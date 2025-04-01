class AddCurrentPhaseToTournaments < ActiveRecord::Migration[7.2]
  def change
    add_reference :tournaments, :current_phase, foreign_key: { to_table: :phases }
  end
end
