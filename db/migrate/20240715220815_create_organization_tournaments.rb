class CreateOrganizationTournaments < ActiveRecord::Migration[7.1]
  def change
    create_table :organization_tournaments do |t|
      t.bigint :organization_id, null: false
      t.bigint :tournament_id, null: false

      t.timestamps
    end

    add_index :organization_tournaments, :organization_id
    add_index :organization_tournaments, :tournament_id
    # Specify a shorter name for the index
    add_index :organization_tournaments, %i[organization_id tournament_id], unique: true, name: "index_org_tourns_on_org_id_and_tourn_id"

    # Add foreign keys for referential integrity
    add_foreign_key :organization_tournaments, :organizations
    add_foreign_key :organization_tournaments, :tournaments
  end
end
