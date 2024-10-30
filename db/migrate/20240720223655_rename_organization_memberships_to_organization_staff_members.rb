class RenameOrganizationMembershipsToOrganizationStaffMembers < ActiveRecord::Migration[7.1]
  def change
    rename_table :organization_memberships, :organization_staff_members
  end
end
