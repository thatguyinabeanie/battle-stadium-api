class AddArchivedAtToUsersAndProfiles < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :archived_at, :datetime
    add_column :profiles, :archived_at, :datetime
  end
end
