require_relative "serializer_mixin"
module Serializers
  class Round < ActiveModel::Serializer
    include SerializerMixin::Id
    attributes :round_number, :phase_id
    attributes :started_at, :ended_at
  end
end
