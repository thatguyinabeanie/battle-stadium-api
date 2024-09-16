require_relative "serializer_mixin"
module Serializers
  class Pokemon < ActiveModel::Serializer
    include SerializerMixin::Id
    attributes :nickname
    attributes :ability, :tera_type, :nature, :held_item
    attributes :move1, :move2, :move3, :move4
  end
end
