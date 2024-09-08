
class User < ApplicationRecord
  MAX_CHARACTER_LENGTH=50
  validates :username, presence: true, uniqueness: true, allow_blank: false
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :first_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true
  validates :last_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true

  has_one :owned_organization, class_name: "Organization", foreign_key: "owner_id", dependent: :destroy,
                               inverse_of: :owner
  has_many :organization_staff_members, class_name: "OrganizationStaffMember", dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :user
  has_many :accounts, inverse_of: :user, dependent: :destroy, class_name: "Auth::Account"
  has_many :sessions, inverse_of: :user, dependent: :destroy, class_name: "Auth::Session"

  def admin?
    admin
  end

  def staff_member_of?(organization)
    organization.staff.exists?(id:)
  end

end
