class AddFormToPokemon < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon, :form, :string, default: nil
  end
end
