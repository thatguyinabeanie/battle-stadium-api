class CreateProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :profiles, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :username, null: false
      t.timestamps
    end

    add_index :profiles, :username, unique: true
  end
end
