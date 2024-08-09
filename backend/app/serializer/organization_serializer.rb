require_relative 'user_serializer'
require_relative 'serializer_mixin'

module Serializer
  module OrganizationMixin
    extend ActiveSupport::Concern
    included do
      class_attribute :owner_serializer
      attribute :owner
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
    self.owner_serializer = Serializer::User
  end
end
