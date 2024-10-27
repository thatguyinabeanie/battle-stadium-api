class CreateRk9Tournaments < ActiveRecord::Migration[7.2]
  def change
    create_table :rk9_tournaments do |t|
      t.string :rk9_id, null: false
      t.string :name, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false

      t.timestamps
    end

    add_index :rk9_tournaments, :rk9_id, unique: true
  end
end
