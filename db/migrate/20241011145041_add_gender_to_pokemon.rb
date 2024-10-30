class AddGenderToPokemon < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon, :gender, :integer, default: 2, null: false
  end
end
