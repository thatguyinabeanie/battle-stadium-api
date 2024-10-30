class RefactorPlayerOneAndTwoInMatches < ActiveRecord::Migration[7.1]
  def up
    # Remove the existing foreign keys
    remove_foreign_key :matches, column: :player_one_id
    remove_foreign_key :matches, column: :player_two_id

    # Add the new foreign keys
    add_foreign_key :matches, :players, column: :player_one_id
    add_foreign_key :matches, :players, column: :player_two_id
  end

  def down
    # Remove the new foreign keys
    remove_foreign_key :matches, column: :player_one_id
    remove_foreign_key :matches, column: :player_two_id

    # Add back the original foreign keys to the users table
    # This assumes the users table exists and was the original reference
    add_foreign_key :matches, :users, column: :player_one_id
    add_foreign_key :matches, :users, column: :player_two_id
  end
end
