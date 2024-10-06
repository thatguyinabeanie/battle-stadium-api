class ChangeByeToBooleanInMatches < ActiveRecord::Migration[7.2]
  def change
    remove_reference :matches, :bye, foreign_key: { to_table: :players }
    add_column :matches, :bye, :boolean, default: false, null: false
  end
end
