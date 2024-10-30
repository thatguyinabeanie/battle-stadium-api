class RemoveTournamentIdFromMatches < ActiveRecord::Migration[7.1]
  def change
    remove_column :matches, :tournament_id, :integer
  end
end
