require_relative "serializer_mixin"
require_relative "pokemon_serializer"
require_relative "user_profile_serializer"
require_relative "format_serializer"
require_relative "game_serializer"

module Serializers
  class PokemonTeam < ActiveModel::Serializer
    include SerializerMixin::Id
    belongs_to :user_profile, serializer: Serializers::UserProfile
    attributes :name, :pokemon, :format, :public, :archived_at, :game

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
