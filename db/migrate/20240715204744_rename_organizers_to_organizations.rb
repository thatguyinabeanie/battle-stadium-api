class RenameOrganizersToOrganizations < ActiveRecord::Migration[7.1]
  def change
    rename_table :organizers, :organizations
    rename_table :organizer_staffs, :organization_staff
    rename_column :organization_staff, :organizer_id, :organization_id
  end
end
