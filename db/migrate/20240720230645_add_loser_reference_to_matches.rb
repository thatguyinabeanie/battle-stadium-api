class AddLoserReferenceToMatches < ActiveRecord::Migration[7.1]
  def change
    add_reference :matches, :loser, foreign_key: { to_table: :users }
  end
end
