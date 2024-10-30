require_relative "serializer_mixin"
module Serializers
  class Format < ActiveModel::Serializer
    include SerializerMixin::Id
    include SerializerMixin::Name
  end
end
