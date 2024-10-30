class ChangeReporterIdOnMatchGames < ActiveRecord::Migration[7.2]
  def change
    # Remove the existing foreign key constraint
    remove_foreign_key :match_games, column: :reporter_id

    # Add the new foreign key constraint
    add_foreign_key :match_games, :profiles, column: :reporter_id, on_delete: :nullify
  end
end
