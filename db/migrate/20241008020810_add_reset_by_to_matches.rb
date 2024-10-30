class AddResetByToMatches < ActiveRecord::Migration[7.2]
  def change
    add_column :matches, :reset_by, :uuid
    add_foreign_key :matches, :users, column: :reset_by
  end
end
