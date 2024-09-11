class AddHiddenColumnToOrganizationsTable < ActiveRecord::Migration[7.2]
  def change
    add_column :organizations, :hidden, :boolean, default: false, null: false
  end
end
