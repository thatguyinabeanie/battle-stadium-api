# typed: true

module Organization
  class Organization < ApplicationRecord
    self.table_name = 'organizations'
    extend FriendlyId
    friendly_id :name, use: :slugged

    belongs_to :user

    has_many :organization_staff, class_name: 'Organization::Staff', dependent: :destroy
    has_many :staff, through: :organization_staff, source: :user

    has_many :organization_tournaments, class_name: 'Organization::OrganizationTournament', dependent: :destroy

    has_many :tournaments, through: :organization_tournaments
    validates :name, presence: true
  end
end
