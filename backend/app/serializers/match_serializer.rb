require_relative 'serializer_mixin'

module Serializers
  module MatchMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      attributes :round_id, :tournament_id, :table_number, :player1_id, :player2_id
    end
  end

  class Match < ActiveModel::Serializer
    include MatchMixin
  end

  class MatchDetails < ActiveModel::Serializer
    include MatchMixin

    attributes :winner_id, :loser_id
    attributes :player_one_check_in, :player_two_check_in
    attributes :created_at, :updated_at, :reported_at
  end
end
