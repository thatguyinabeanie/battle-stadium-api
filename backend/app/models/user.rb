
class User < ApplicationRecord
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
  has_many :staff, through: :organization_staff_members, source: :user

  has_many :clerk_users, dependent: :destroy, inverse_of: :user, class_name: "ClerkUser"

  after_create :create_default_profile
  belongs_to :default_profile, class_name: "Profile", foreign_key: "default_profile_id", optional: true
  has_many :profiles, dependent: :destroy, inverse_of: :user, class_name: "Profile"

  def staff_member_of?(organization)
    organization.staff.exists?(id:) || organization.owner == self
  end

  private

  def create_default_profile
    Profile.create(user: self, username: self.username)
  end

  def username_uniqueness_across_users_and_profiles
    errors.add(:username, "has already been taken") if User.where.not(id: self.id).exists?(username:) && Profile.where.not(user_id: self.id).exists?(username:)
  end

  def username_unchangeable
    if username_changed? && self.persisted?
      errors.add(:username, "cannot be changed once it is created")
    end
  end
end
