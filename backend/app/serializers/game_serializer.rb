require_relative 'format_serializer'
require_relative 'serializer_mixin'

module Serializers
  module GameMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      include SerializerMixin::Name
    end
  end

  class Game < ActiveModel::Serializer
    include GameMixin
  end

  class GameDetails < ActiveModel::Serializer
    include GameMixin
    attributes :formats
    has_many :formats, serializer: Serializers::Format
  end
end
