require_relative "serializer_mixin"
module Serializers
  module UserMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      attributes :username, :pronouns, :image_url
    end
  end

  module UserDetailsMixin
    extend ActiveSupport::Concern
    include UserMixin
    included do
      attributes :email, :first_name, :last_name
    end
  end

  class User < ActiveModel::Serializer
    include UserMixin
  end

  class UserDetails < ActiveModel::Serializer
    include UserDetailsMixin
  end

  class UserMe < ActiveModel::Serializer
    include UserDetailsMixin
    attribute :organizations
    attributes :admin

    def organizations
      owned_organization = object.owned_organization

      orgs = (owned_organization ? [owned_organization] : []) + object.organization_staff_members.map(&:organization)

      orgs.map do |org|
        {
          id: org.id,
          name: org.name,
          description: org.description,
          owner: {
            id: org.owner.id,
            username: org.owner.username,
            pronouns: org.owner.pronouns
          }
        }
      end
    end
  end
end
