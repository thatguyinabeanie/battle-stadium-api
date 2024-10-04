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

    has_many :phase_players, class_name: "Tournaments::PhasePlayer", inverse_of: :phase, dependent: :destroy
    has_many :players, through: :phase_players, source: :player, class_name: "Tournaments::Player"

    validates :name, presence: true
    validates :best_of, numericality: { greater_than: 0, only_integer: true }, presence: true

    validates :order, uniqueness: { scope: :tournament_id }

    validate :best_of_must_be_odd
    validates :type, presence: true
    validates :tournament, presence: true

    before_validation :set_defaults
    before_validation :set_default_name, if: -> { :name.nil? }

    def accept_players(players:)
      raise "Number of players must be greater than zero" unless players&.checked_in_and_submitted_team_sheet&.count&.positive?
      players = players.checked_in_and_submitted_team_sheet
      number_of_players = players.count

      number_of_rounds = Math.log2(number_of_players).ceil
      update!(players:, started_at: Time.current.utc, number_of_rounds:)
    end

    def players_ready
      players_checked_in.where(team_sheet_submitted: true)
    end

    def players_checked_in
      players.where(checked_in_at: nil)
    end

    def players_not_checked_in_has_team_sheet
      players_not_checked_in.where(team_sheet_submitted: true)
    end

    def players_not_checked_in
      players.where.not(checked_in_at: nil)
    end

    def players_checked_in_no_team_sheet
      players_checked_in.where(team_sheet_submitted: false)
    end

    def players_not_checked_in_or_no_team_sheet
      players_not_checked_in.where(team_sheet_submitted: false)
    end

    protected

    def set_defaults
      self.best_of ||= 3
      self.type = self.class.name if type.blank?
      self.number_of_rounds ||= 0
      self.name ||= self.class.name
      self.order ||= tournament.phases.count ? tournament.phases.count + 1 : 0
    end

    private

    def best_of_must_be_odd
      errors.add(:best_of, I18n.t("errors.phase.best_of_must_be_odd")) unless best_of.odd?
    end
  end
end
# :nocov:
