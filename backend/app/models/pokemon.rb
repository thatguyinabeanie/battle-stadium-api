class Pokemon < ApplicationRecord
  self.table_name = "pokemon"
  belongs_to :pokemon_team, class_name: "PokemonTeam", inverse_of: :pokemon
  validates :pokemon_team_id, presence: true

  validates :species, presence: true
  validates :ability, presence: true
  validates :tera_type, presence: true
  validates :nature, presence: true

  validates :form, presence: true, allow_blank: true
  validates :item, presence: true, allow_blank: true

  validates :move1, presence: true, allow_blank: true
  validates :move2, presence: true, allow_blank: true
  validates :move3, presence: true, allow_blank: true
  validates :move4, presence: true, allow_blank: true

  enum :gender, { FEMALE: 0, MALE: 1, NON_BINARY: 2 }

  def evs
    if ev_hp || ev_atk || ev_def || ev_spa || ev_spd || ev_spe
      {
        hp: ev_hp,
        atk: ev_atk,
        def: ev_def,
        spa: ev_spa,
        spd: ev_spd,
        spe: ev_spe
      }
    end
  end

  def ivs
    if iv_hp || iv_atk || iv_def || iv_spa || iv_spd || iv_spe
      {
        hp: iv_hp,
        atk: iv_atk,
        def: iv_def,
        spa: iv_spa,
        spd: iv_spd,
        spe: iv_spe
      }
    end
  end
end
