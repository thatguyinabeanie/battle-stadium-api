class CreateMatchScores < ActiveRecord::Migration[7.1]
  def change
    create_table :match_scores do |t|
      t.references :match, null: false, foreign_key: true
      t.references :winner, null: false, foreign_key: { to_table: :users }
      t.references :loser, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
