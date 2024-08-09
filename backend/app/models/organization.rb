# typed: true

class Organization < ApplicationRecord
  self.table_name = 'organizations'
  belongs_to :owner, class_name: 'User', optional: false

  has_many :tournaments, class_name: 'Tournaments::Tournament', dependent: :destroy

  has_many :organization_staff_members, class_name: 'OrganizationStaffMember', dependent: :destroy
  has_many :staff, through: :organization_staff_members, source: :user

  validates :name, presence: true, uniqueness: true
  validates :owner, presence: true
  validates :owner_id, uniqueness: true

  def create_tournament!(params)
    tournaments.create!(params)
  end
end
