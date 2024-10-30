class ChangeTypeColumnOnPhasesToNotNull < ActiveRecord::Migration[7.1]
  def change
    change_column_null :phases, :type, false
  end
end
