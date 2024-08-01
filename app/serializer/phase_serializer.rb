require_relative serializer_mixin
require_relative 'round_serializer'
require_relative 'player_serializer'

module Serializer
  module PhaseMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      include SerializerMixin::Name
      attributes :type
      attributes :best_of, :number_of_rounds, :criteria, :order
      attributes :started_at, :ended_at, :created_at, :updated_at
      attributes :tournament_id
    end
  end

  class Phase < ActiveModel::Serializer
    include PhaseMixin
  end

  class PhaseDetails < ActiveModel::Serializer
    include PhaseMixin
    attribute :players, serializer: Serializer::Player
    attribute :rounds, serializer: Serializer::Round
  end
end
