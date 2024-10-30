class RenameRegistrationIdToPlayerId < ActiveRecord::Migration[7.1]
  def change
    rename_column :pokemon_sets, :registration_id, :player_id
  end
end
