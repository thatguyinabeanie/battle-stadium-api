class AddRegistrationIdToPokemonSets < ActiveRecord::Migration[7.1]
  def change
    # Ensure the pokemon_sets table exists and then add the registration_id column
    return unless table_exists?(:pokemon_sets)

    add_column :pokemon_sets, :registration_id, :bigint
    add_index :pokemon_sets, :registration_id
    # Correct the table name to tournament_registrations
    add_foreign_key :pokemon_sets, :tournament_registrations, column: :registration_id
  end
end
