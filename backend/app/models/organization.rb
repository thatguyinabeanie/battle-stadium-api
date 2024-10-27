# typed: true

class Organization < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  def self.policy_class
    OrganizationPolicy
  end
  self.table_name = "organizations"
  belongs_to :owner, class_name: "Account", optional: true

  has_many :tournaments, class_name: "Tournament", dependent: :destroy
  has_many :organization_staff_members, class_name: "OrganizationStaffMember", dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :account

  validates :name, presence: true, uniqueness: true
  validate :unique_owner_id

  def create_tournament!(params)
    tournaments.create!(params)
  end

  def unique_owner_id
    return if owner_id.nil?

    errors.add(:owner_id, "has already been taken") if Organization.where(owner_id:).where.not(id:).exists?
  end

  def has_staff_member?(account:)
    account && (staff.exists?(account.id) || owner == account)
  end
end
