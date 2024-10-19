class AddStatsToPokemon < ActiveRecord::Migration[7.2]
  def change
    add_column :pokemon, :shiny, :boolean, default: false, null: false

    add_column :pokemon, :ev_hp, :integer, default: nil, null: true
    add_column :pokemon, :ev_atk, :integer, default: nil, null: true
    add_column :pokemon, :ev_def, :integer, default: nil, null: true
    add_column :pokemon, :ev_spa, :integer, default: nil, null: true
    add_column :pokemon, :ev_spd, :integer, default: nil, null: true
    add_column :pokemon, :ev_spe, :integer, default: nil, null: true

    add_column :pokemon, :iv_hp, :integer, default: nil, null: true
    add_column :pokemon, :iv_atk, :integer, default: nil, null: true
    add_column :pokemon, :iv_def, :integer, default: nil, null: true
    add_column :pokemon, :iv_spa, :integer, default: nil, null: true
    add_column :pokemon, :iv_spd, :integer, default: nil, null: true
    add_column :pokemon, :iv_spe, :integer, default: nil, null: true
  end
end
