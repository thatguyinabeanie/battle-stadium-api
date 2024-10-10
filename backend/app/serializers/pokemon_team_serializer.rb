require_relative "serializer_mixin"
require_relative "pokemon_serializer"
require_relative "user_profile_serializer"

module Serializers
  class PokemonTeam < ActiveModel::Serializer
    include SerializerMixin::Id
    belongs_to :user_profile, serializer: Serializers::UserProfile
    attributes :name, :pokemon

    def pokemon
      object.pokemon.map do |p|
        Serializers::Pokemon.new(p)
      end
    end
  end
end
