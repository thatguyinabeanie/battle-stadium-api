class AddUniqueIndexToNameOnFormats < ActiveRecord::Migration[7.1]
  def change
    add_index :formats, %i[name game_id], unique: true
  end
end
