require_relative "serializer_mixin"

module Serializers
  module MatchMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      attributes :round_id, :tournament_id, :table_number, :player_one, :player_two, :reset_by
      def player_one
        object.player_one&.profile&.username
      end
      def player_two
        object.player_two&.profile&.username
      end
      def reset_by
        object.reset_by&.default_profile&.username
      end
    end
  end

  class Match < ActiveModel::Serializer
    include MatchMixin
  end

  class MatchDetails < ActiveModel::Serializer
    include MatchMixin

    attributes :winner, :loser
    attributes :player_one_check_in, :player_two_check_in
    attributes :created_at, :updated_at, :ended_at

    def winner
      object.winner&.profile&.username
    end

    def loser
      object.loser&.profile&.username
    end
  end
end
