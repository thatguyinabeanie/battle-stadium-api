require_relative '../../../serializer/game_serializer'

module Api
  module V1
    class GamesController < AbstractApplicationController
      self.klass = ::Game
      self.serializer_klass = Serializer::Game
      self.detail_serializer_klass = Serializer::GameDetails

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
