class AddUserIdToOrganizations < ActiveRecord::Migration[7.1]
  def change
    add_reference :organizations, :user, foreign_key: true
  end
end
