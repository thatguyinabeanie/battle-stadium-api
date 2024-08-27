class ChangeExpiresAtToDatetimeInAccount < ActiveRecord::Migration[7.1]
  def up
    change_column :account, :expires_at, :integer, null: false
  end

  def down
    change_column :account, :expires_at, 'bigint USING extract(epoch from expires_at)::bigint', null: false
  end
end
