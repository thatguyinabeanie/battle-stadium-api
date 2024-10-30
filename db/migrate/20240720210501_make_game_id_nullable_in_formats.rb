class MakeGameIdNullableInFormats < ActiveRecord::Migration[7.1]
  def change
    change_column_null :formats, :game_id, true
  end
end
