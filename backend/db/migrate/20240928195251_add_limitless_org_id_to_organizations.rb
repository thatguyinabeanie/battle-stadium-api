class AddLimitlessOrgIdToOrganizations < ActiveRecord::Migration[7.2]
  def change
    add_column :organizations, :limitless_org_id, :bigint
  end
end
