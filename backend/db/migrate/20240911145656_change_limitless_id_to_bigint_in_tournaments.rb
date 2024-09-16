class ChangeLimitlessIdToBigintInTournaments < ActiveRecord::Migration[7.2]
  def change
    change_column :tournaments, :limitless_id, :bigint
  end
end
