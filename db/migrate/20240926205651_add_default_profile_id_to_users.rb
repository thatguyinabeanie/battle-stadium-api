class AddDefaultProfileIdToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :default_profile_id, :uuid
    add_foreign_key :users, :profiles, column: :default_profile_id
  end
end
