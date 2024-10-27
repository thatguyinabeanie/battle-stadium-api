
class Account < ApplicationRecord
  MAX_CHARACTER_LENGTH=50

  validates :username, presence: true, allow_blank: false
  validate :username_uniqueness_across_users_and_profiles
  validate :username_unchangeable, on: :update

  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :first_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true
  validates :last_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true

  has_one :owned_organization, class_name: "Organization", foreign_key: "owner_id", dependent: :destroy,
                               inverse_of: :owner

  has_many :organization_staff_members, class_name: "OrganizationStaffMember", dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :account

  has_many :clerk_users, dependent: :destroy, inverse_of: :account, class_name: "ClerkUser"

  after_create :create_default_profile
  has_one :default_profile, class_name: "Profile", dependent: :destroy, inverse_of: :account
  has_one :rk9_profile, class_name: "Rk9Profile", inverse_of: :account, foreign_key: "account_id", dependent: :nullify

  has_many :profiles, ->(account) { where(account: account.id).order(id: :asc) }, class_name: "Profile", dependent: :nullify, inverse_of: :account

  def staff_member_of?(organization)
    organization.staff.exists?(id:) || organization.owner == self
  end

  private

  def create_default_profile
    self.default_profile = profiles.create(username: self.username, account: self, default: true)
    self.save!
  end

  def username_uniqueness_across_users_and_profiles
    errors.add(:username, "has already been taken") if Account.where.not(id: self.id).exists?(username:) && Profile.where.not(account_id: self.id).exists?(username:)
  end

  def username_unchangeable
    if username_changed? && self.persisted?
      errors.add(:username, "cannot be changed once it is created")
    end
  end
end
