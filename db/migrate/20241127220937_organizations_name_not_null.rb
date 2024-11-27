class OrganizationsNameNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :organizations, :name, false
  end
end
