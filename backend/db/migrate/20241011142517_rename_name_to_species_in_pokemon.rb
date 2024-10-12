class RenameNameToSpeciesInPokemon < ActiveRecord::Migration[7.2]
  def change
    rename_column :pokemon, :name, :species
  end
end
