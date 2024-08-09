class RemoveSlugFromTables < ActiveRecord::Migration[7.1]
  def up
    remove_column :games, :slug, :string
    remove_column :organizations, :slug, :string
    remove_column :users, :slug, :string
    drop_table :friendly_id_slugs
  end

  def down
    create_table :friendly_id_slugs do |t|
      t.string :slug
      t.references :sluggable, polymorphic: true, index: true
      t.string :scope
      t.datetime :created_at
    end

    add_column :users, :slug, :string
    add_column :organizations, :slug, :string
    add_column :games, :slug, :string
  end
end
