class AddPositionToPokemon < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon, :position, :integer, null: false, default: 0
    add_index :pokemon, [:pokemon_team_id, :position], unique: true
  end
end
