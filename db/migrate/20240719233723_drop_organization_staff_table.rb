class DropOrganizationStaffTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :organization_staff
  end

  def down
    create_table :organization_staff do |t|
      Recreate the table structure here if you want to be able to roll back this migration
      # For example:
      t.references :organization, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
