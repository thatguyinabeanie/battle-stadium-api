require_relative "serializer_mixin"
require_relative "pokemon_serializer"
require_relative "profile_serializer"
require_relative "format_serializer"
require_relative "game_serializer"

module Serializers
  class PokemonTeam < ActiveModel::Serializer
    include SerializerMixin::Id
    belongs_to :profile, serializer: Serializers::Profile
    attributes :name, :pokemon, :format, :published, :archived_at, :game, :pokepaste_id

    def format
      Serializers::Format.new(object.format)
    end

    def game
      Serializers::Game.new(object.game)
    end

    def pokemon
      object.pokemon.map do |p|
        Serializers::Pokemon.new(p)
      end
    end
  end
end
