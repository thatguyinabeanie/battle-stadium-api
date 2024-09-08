class CreateClerkUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :clerk_users do |t|
      t.references :user, null: false, type: :uuid, foreign_key: true
      t.string :clerk_user_id, null: false

      t.timestamps
    end
  end
end
