class RenameUserProfileIdToProfileId < ActiveRecord::Migration[7.2]
  def change
    rename_column :pokemon_teams, :user_profile_id, :profile_id
    rename_column :chat_messages, :user_profile_id, :profile_id
    rename_column :players, :user_profile_id, :profile_id
  end
end
