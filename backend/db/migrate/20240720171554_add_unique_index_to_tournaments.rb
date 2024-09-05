class AddUniqueIndexToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_index :tournaments, %i[organization_id name start_date], unique: true, name: "index_tournaments_on_org_id_name_start_date"
  end
end
