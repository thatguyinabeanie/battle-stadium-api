require_relative "serializer_mixin"
require_relative "user_serializer"

module Serializers
  module OrganizationMixin
    extend ActiveSupport::Concern
    included do
      class_attribute :owner_serializer
      attribute :owner
      attribute :logo_url
      attributes :description

      include SerializerMixin::Id
      include SerializerMixin::Name

      def owner
        @owner ||= owner_serializer.new(object.owner).as_json
      end
    end
  end

  class Organization < ActiveModel::Serializer
    include OrganizationMixin
    self.owner_serializer = ::Serializers::User
  end
end
