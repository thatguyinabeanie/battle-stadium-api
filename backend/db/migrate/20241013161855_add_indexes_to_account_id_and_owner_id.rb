class AddIndexesToAccountIdAndOwnerId < ActiveRecord::Migration[7.2]
  def change
    add_index :clerk_users, :account_id, name: "index_clerk_users_on_account_id"
    add_index :organization_staff_members, :account_id, name: "index_organization_staff_members_on_account_id"
    add_index :players, :account_id, name: "index_players_on_account_id"
    add_index :profiles, :account_id, name: "index_profiles_on_account_id"
    add_index :organizations, :owner_id, name: "index_organizations_on_owner_id"
  end
end
