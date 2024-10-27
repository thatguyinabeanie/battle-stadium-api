class AddTypeToProfiles < ActiveRecord::Migration[7.2]
  def change
    add_column :profiles, :type, :string, null: false, default: "Profile"
  end
end
