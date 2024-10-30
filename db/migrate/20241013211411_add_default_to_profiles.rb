class AddDefaultToProfiles < ActiveRecord::Migration[7.2]
  def change
    add_column :profiles, :default, :boolean, null: false, default: false
  end
end
