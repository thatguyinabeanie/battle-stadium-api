require_relative "../../../serializers/pokemon_team_serializer"

module Api
  module V1
    class PokemonTeamsController < AbstractApplicationController
      self.klass = ::PokemonTeam

      def index
        authorize self, :index?
        @objects = klass.where(public: true, archived: false)
        render json: @objects, each_serializer: ::Serializers::PokemonTeam, status: :ok
      end

    end
  end
end
