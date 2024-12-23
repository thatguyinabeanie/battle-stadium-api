require_relative "serializer_mixin"

module Serializers
  module MatchGameMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      attributes :match_id, :game_number, :player_one, :player_two, :ended_at, :started_at
      attributes :winner, :loser, :reporter

      def player_one
        object.player_one.profile.username
      end
      def player_two
        object.player_two.profile.username
      end
      def winner
        object.winner&.profile&.username
      end

      def loser
        object.loser&.profile&.username
      end

      def reporter
        object.reporter&.username
      end
    end
  end

  class MatchGame < ActiveModel::Serializer
    include MatchGameMixin
  end
end
