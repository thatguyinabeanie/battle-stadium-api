require_relative "serializer_mixin"

module Serializers
  class UserProfile < ActiveModel::Serializer
    include SerializerMixin::Id
    attributes :username, :image_url, :pronouns

    def pronouns
      object.user.pronouns
    end
  end
end
