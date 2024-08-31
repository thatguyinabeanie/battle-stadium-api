require 'devise'
require 'faker'
require_relative '../../lib/helpers/JWT/token_handler'

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         #  :confirmable, :lockable, :timeoutable, :trackable, :omniauthable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  MIN_PASSWORD_LENGTH = 8
  MAX_CHARACTER_LENGTH = 50

  validate :password_complexity, if: :password_required?
  validates :username, presence: true, uniqueness: true, allow_blank: false
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :pronouns, length: { maximum: MAX_CHARACTER_LENGTH }, allow_blank: true
  validates :first_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true
  validates :last_name, length: { maximum: MAX_CHARACTER_LENGTH }, presence: true
  has_one :owned_organization, class_name: 'Organization', foreign_key: 'owner_id', dependent: :destroy, inverse_of: :owner
  has_many :organization_staff_members, class_name: 'OrganizationStaffMember', dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :user
  has_many :account, inverse_of: :user, dependent: :destroy, class_name: 'Auth::Account'
  has_many :sessions, inverse_of: :user, dependent: :destroy, class_name: 'Auth::Session'

  before_create :generate_jti

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

  # Update record attributes when :current_password matches, otherwise
  # returns error on :current_password.
  #
  # This method also rejects the password field if it is blank (allowing
  # users to change relevant information like the e-mail without changing
  # their password). In case the password field is rejected, the confirmation
  # is also rejected as long as it is also blank.
  def update_with_password(params)
    errors.add(:password, :blank) if params[:password].blank?
    errors.add(:password_confirmation, :blank) if params[:password_confirmation].blank?
    return false if errors.any?

    super
  end
end
