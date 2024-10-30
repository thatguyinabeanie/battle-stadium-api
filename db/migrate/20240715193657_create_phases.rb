class CreatePhases < ActiveRecord::Migration[7.1]
  def change
    create_table :phases do |t|
      t.references :tournament, null: false, foreign_key: true
      t.string :phase_type
      t.integer :number_of_rounds
      t.string :criteria

      t.timestamps
    end
  end
end
