class ChangeAccountIdOnPlayersToNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :players, :account_id, false
  end
end
