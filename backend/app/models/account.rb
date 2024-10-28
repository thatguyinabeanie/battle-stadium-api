
class Account < ApplicationRecord
  MAX_CHARACTER_LENGTH=50
  def self.policy_class
    AccountPolicy
  end

  attr_accessor :username

  def initialize(attributes = {})
    # Extract username if provided
    @username = attributes&.delete(:username)
    super
  end

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

  has_many :profiles,  class_name: "Profile", dependent: :nullify, inverse_of: :account

  delegate :username, to: :default_profile, allow_nil: true

  def staff_member_of?(organization)
    organization.staff.exists?(id:) || organization.owner == self
  end

  def self.find_by_profile_username(username)
    Profile.find_by(username: username)&.account
  end

  def self.find_or_create_by_profile_username(username:, email:, first_name:, last_name:, pronouns: "", admin: false, image_url: nil)
    account = Account.find_by_profile_username(username)
    return account if account

    account = Account.create!(username: , email: , first_name: , last_name: , pronouns: , admin: , image_url:)
    account
  end

  private

  def create_default_profile
    profile = Profile.create(account: self, default: true, username: @username)

    if profile.valid?
      self.default_profile = profile
      self.save!
    else
      msg = "Failed to create default profile: #{profile.errors.full_messages.join(", ")}"
      Rails.logger.error msg
      raise ActiveRecord::RecordNotSaved, msg
    end
  end
end
