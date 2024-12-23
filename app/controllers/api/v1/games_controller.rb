require_relative "../../../serializers/game_serializer"

module Api
  module V1
    class GamesController < AbstractApplicationController
      self.klass = ::Game
      self.serializer_klass = Serializers::GameDetails
      self.detail_serializer_klass = Serializers::GameDetails
      self.enable_pagination = true
      protected

      def permitted_params
        params.require(:game).permit(:name)
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_game
        @game = set_object
      end
    end
  end
end
