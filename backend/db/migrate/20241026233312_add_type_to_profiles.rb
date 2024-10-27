class AddTypeToProfiles < ActiveRecord::Migration[7.2]
  def change
    add_column :profiles, :type, :string
  end
end
