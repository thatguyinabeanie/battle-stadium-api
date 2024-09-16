class RenameSessionsToSession < ActiveRecord::Migration[7.1]
  def change
    rename_table :sessions, :session
  end
end
