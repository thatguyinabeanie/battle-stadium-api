require_relative "serializer_mixin"
module Serializers
  module AccountMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id
      attributes :username, :pronouns, :image_url, :country

      def username
        object.default_profile&.username
      end
    end
  end

  module AccountDetailsMixin
    extend ActiveSupport::Concern
    include AccountMixin
    included do
      attributes :email, :first_name, :last_name
    end
  end

  class Account < ActiveModel::Serializer
    include AccountMixin
  end

  class AccountDetails < ActiveModel::Serializer
    include AccountDetailsMixin
  end

  class AccountMe < ActiveModel::Serializer
    include AccountDetailsMixin
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
            username: org.owner.default_profile.username,
            pronouns: org.owner.pronouns
          }
        }
      end
    end
  end
end
