class AddNicknameToPokemonSets < ActiveRecord::Migration[7.1]
  def change
    add_column :pokemon_sets, :nickname, :string
  end
end
