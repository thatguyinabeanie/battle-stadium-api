class DropAuthJsTables < ActiveRecord::Migration[7.2]
  def up
    drop_table :sessions
    drop_table :accounts
    drop_table :authenticators
    drop_table :verification_tokens
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
