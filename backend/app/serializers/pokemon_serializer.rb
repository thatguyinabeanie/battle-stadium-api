module Serializers

  module PokemonMixin
    extend ActiveSupport::Concern

    included do
      attributes :position
      attributes :species, :form, :gender, :shiny, :nickname
      attributes :ability, :tera_type, :item
      attributes :move1, :move2, :move3, :move4
    end
  end

  class PokemonOTS < ActiveModel::Serializer
    include PokemonMixin
  end

  class Pokemon < ActiveModel::Serializer
    include PokemonMixin
    attributes :evs, :ivs,  :nature, :pokemon_team_id
  end
end
