class ChangeNumberOfRoundsOnPhasesToNotNullWithDefault < ActiveRecord::Migration[7.1]
  def up
    change_column_default :phases, :number_of_rounds, 0
    change_column_null :phases, :number_of_rounds, false
  end

  def down
    change_column_null :phases, :number_of_rounds, true
    change_column_default :phases, :number_of_rounds, nil
  end
end
