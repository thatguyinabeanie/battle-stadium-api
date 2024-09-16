class AddUniquenessIndexOnNameAndOrganizationIdToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_index :tournaments, %i[name organization_id], unique: true, name: "index_tournaments_on_name_and_organization_id"
  end
end
