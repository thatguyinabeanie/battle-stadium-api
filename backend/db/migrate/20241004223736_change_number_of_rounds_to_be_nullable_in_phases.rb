class ChangeNumberOfRoundsToBeNullableInPhases < ActiveRecord::Migration[7.2]
  def up
    change_column_null :phases, :number_of_rounds, true
    change_column_default :phases, :number_of_rounds, nil
  end

  def down
    change_column_null :phases, :number_of_rounds, false
    change_column_default :phases, :number_of_rounds, 0 # or the previous default value
  end
end
