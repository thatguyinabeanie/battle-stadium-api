class ChangeUserIdOnProfilesToNullTrue < ActiveRecord::Migration[7.2]
  def change
    change_column_null :profiles, :user_id, true
  end
end
