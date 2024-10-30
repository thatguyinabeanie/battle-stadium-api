class ChangePlayerIdsToBeNullableInMatches < ActiveRecord::Migration[7.2]
  def change
    change_column_null :matches, :player_one_id, true
    change_column_null :matches, :player_two_id, true
  end
end
