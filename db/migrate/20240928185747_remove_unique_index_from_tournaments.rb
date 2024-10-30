class RemoveUniqueIndexFromTournaments < ActiveRecord::Migration[7.2]
  def change
    remove_index :tournaments, name: "index_tournaments_on_name_and_organization_id"
    remove_index :tournaments, name: "index_tournaments_on_org_id_name_start_date"
  end
end
