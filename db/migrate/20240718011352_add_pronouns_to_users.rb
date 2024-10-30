class AddPronounsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :pronouns, :string, null: true
  end
end
