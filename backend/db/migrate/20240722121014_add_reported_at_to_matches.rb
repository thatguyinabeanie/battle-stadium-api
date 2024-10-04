class AddReportedAtToMatches < ActiveRecord::Migration[7.1]
  def change
    add_column :matches, :ended_at, :datetime
  end
end
