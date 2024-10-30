class AddOrganizationIdToTournaments < ActiveRecord::Migration[7.1]
  def change
    return if column_exists?(:tournaments, :organization_id)

    add_reference :tournaments, :organization, foreign_key: true
  end
end
