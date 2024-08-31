class UpdatePronounsOnUsers < ActiveRecord::Migration[7.1]
  def up
    change_column :users, :pronouns, :string, null: false, default: ''
  end

  def down
    change_column :users, :pronouns, :string, null: true
  end
end
