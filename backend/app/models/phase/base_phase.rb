module Phase
  class BasePhase < ApplicationRecord
    self.table_name = 'phases'
    self.inheritance_column = 'type'
    self.abstract_class = true

    belongs_to :tournament, class_name: 'Tournament::Tournament'
    delegate :organization, to: :tournament

    has_many :rounds, class_name: 'Tournament::Round', inverse_of: :phase, dependent: :destroy

    has_many :phase_players, class_name: 'Tournament::PhasePlayer', inverse_of: :phase, dependent: :destroy
    has_many :players, through: :phase_players, source: :player, class_name: 'Tournament::Player'

    validates :name, presence: true
    validates :best_of, numericality: { greater_than: 0, only_integer: true }, presence: true

    validate :best_of_must_be_odd
    validates :type, presence: true
    validates :tournament, presence: true

    before_validation :set_defaults
    before_validation :set_default_name, if: -> { :name.nil? }

    def accept_players(players:)
      players = players.checked_in_and_ready
      number_of_players = players.count

      if number_of_players <= 0
        raise "Number of players must be greater than zero"
      end

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
      self.type = self.class.name if type.blank?
      self.number_of_rounds ||= 5
      self.criteria ||= 'Shrug'
      self.name ||= self.class.name
    end

    private

    def best_of_must_be_odd
      errors.add(:best_of, I18n.t('errors.phase.best_of_must_be_odd')) unless best_of.odd?
    end
  end
end
