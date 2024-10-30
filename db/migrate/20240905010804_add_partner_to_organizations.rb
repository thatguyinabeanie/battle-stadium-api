class AddPartnerToOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :partner, :boolean, default: false, null: false
  end
end
