class AddOrganizationRefToTournaments < ActiveRecord::Migration[7.1]
  def change
    add_reference :tournaments, :organization, foreign_key: true
  end
end
