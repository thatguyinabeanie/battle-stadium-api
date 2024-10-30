class CreatePokemonSets < ActiveRecord::Migration[7.1]
  def change
    create_table :pokemon_sets do |t|
      t.string :name
      t.string :ability
      t.string :tera_type
      t.string :nature

      t.string :held_item

      t.string :move1
      t.string :move2
      t.string :move3
      t.string :move4

      t.references :tournament, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
