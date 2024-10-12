class RenameHeldItemToItemInPokemon < ActiveRecord::Migration[7.2]
  def change
    rename_column :pokemon, :held_item, :item
  end
end
