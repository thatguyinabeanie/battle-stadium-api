class AddShowCountryFlagToPlayers < ActiveRecord::Migration[7.2]
  def change
    add_column :players, :show_country_flag, :boolean, default: true, null: false
  end
end
