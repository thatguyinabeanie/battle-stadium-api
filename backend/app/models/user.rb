require 'devise'
require 'faker'

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules.

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :omniauthable, :lockable, :timeoutable, :jwt_authenticatable, jwt_revocation_strategy: self

  MIN_PASSWORD_LENGTH = 8
  MAX_CHARACTER_LENGTH = 50

  before_validation :set_uid_and_provider
  validate :password_complexity, if: :password_required?
  validates :username, presence: true, uniqueness: true, allow_blank: false
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :pronouns, length: { maximum: MAX_CHARACTER_LENGTH }, allow_blank: true
  validates :first_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true
  validates :last_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true

  # Include default devise modules. Others available are:
  #
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         #  :confirmable, :lockable, :timeoutable, :trackable, :omniauthable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_one :owned_organization, class_name: 'Organization', foreign_key: 'owner_id', dependent: :destroy, inverse_of: :owner

  has_many :organization_staff_members, class_name: 'OrganizationStaffMember', dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :user

  def staff_member_of?(organization)
    organization.staff.exists?(id:)
  end

  def password_required?
    new_record? || password.present?
  end

  def password_complexity
    return if SecurePassword.complexity_check password

    errors.add :password, 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
  end

  def set_uid_and_provider
    self.uid ||= email if provider == 'email'
  end
end
