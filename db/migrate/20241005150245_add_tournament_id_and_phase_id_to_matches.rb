class AddTournamentIdAndPhaseIdToMatches < ActiveRecord::Migration[7.2]
  def change
    add_reference :matches, :tournament, foreign_key: { to_table: :tournaments }, type: :bigint
    add_reference :matches, :phase, foreign_key: { to_table: :phases }, type: :bigint
  end
end
