class UpdatePronounsOnUsers < ActiveRecord::Migration[7.1]
  def change
      change_column :users, :pronouns, :string, null: false, default: ""
  end
end
