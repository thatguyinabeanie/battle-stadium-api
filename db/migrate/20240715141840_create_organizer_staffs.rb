class CreateOrganizerStaffs < ActiveRecord::Migration[7.1]
  def change
    create_table :organizer_staffs do |t|
      t.references :organizer, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
