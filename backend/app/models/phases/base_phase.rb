# :nocov:
module Phases
  class BasePhase < ::ApplicationRecord
    def self.policy_class
      ::Tournaments::PhasePolicy
    end

    self.table_name = "phases"
    self.inheritance_column = "type"
    self.abstract_class = true

    belongs_to :tournament, class_name: "Tournaments::Tournament"
    delegate :organization, to: :tournament

    has_many :rounds, class_name: "Tournaments::Round", inverse_of: :phase, dependent: :destroy
    has_many :matches, class_name: "Tournaments::Match", inverse_of: :phase
    has_many :phase_players, class_name: "Tournaments::PhasePlayer", inverse_of: :phase, dependent: :destroy
    has_many :players, through: :phase_players, source: :player, class_name: "Tournaments::Player"

    validates :name, presence: true
    validates :best_of, numericality: { greater_than: 0, only_integer: true }, presence: true

    validates :order, uniqueness: { scope: :tournament_id }, presence: true

    validate :best_of_must_be_odd
    validates :type, presence: true
    validates :tournament, presence: true

    before_validation :set_defaults, on: :create

    def start!
      raise NotImplementedError, "Subclasses must implement the start! method"
    end

    def accept_players(players:)
      raise NotImplementedError, "Subclasses must implement the accept_players method"
    end

    protected

    def set_defaults
      self.best_of ||= 3
      self.type = self.class.name if type.blank?
      self.number_of_rounds ||= 0
      self.name ||= self.class.name
      self.order ||= tournament.phases.count ? tournament.phases.count + 1 : 0
    end

    def best_of_must_be_odd
      errors.add(:best_of, I18n.t("errors.phase.best_of_must_be_odd")) unless best_of.odd?
    end
  end
end
# :nocov:
