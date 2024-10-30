class AddLogoUrlToOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_column :organizations, :logo_url, :string
  end
end
