class AddByeToMatches < ActiveRecord::Migration[7.2]
  def change
    add_reference :matches, :bye, foreign_key: { to_table: :players }, index: true, null: true
  end
end
