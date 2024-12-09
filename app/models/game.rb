# typed: true

class Game < ApplicationRecord
  def self.policy_class
    GamePolicy
  end
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  has_many :formats, class_name: "Format", dependent: :nullify
  has_many :tournaments, class_name: "Tournament", dependent: :nullify

  before_validation :set_defaults, on: :create

  def set_defaults
    self.slug = name&.parameterize if slug.blank? && name.present?
  end
end
