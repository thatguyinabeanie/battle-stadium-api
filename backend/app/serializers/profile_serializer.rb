require_relative "serializer_mixin"

module Serializers
  class Profile < ActiveModel::Serializer
    include SerializerMixin::Id
    attributes :username, :image_url, :pronouns, :default

    def default
      object.default?
    end
  end
end
