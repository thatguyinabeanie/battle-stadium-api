class ChangeNameNullConstraintInPhases < ActiveRecord::Migration[7.2]
  def change
    change_column_null :phases, :name, false
  end
end
