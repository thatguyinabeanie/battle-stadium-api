class RenameMatchScoresToMatchDetails < ActiveRecord::Migration[7.1]
  def change
    rename_table :match_scores, :match_details
  end
end
