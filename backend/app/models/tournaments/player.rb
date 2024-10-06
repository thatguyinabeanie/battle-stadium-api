module Tournaments
  class Player < ApplicationRecord
    MAX_POKEMON_SUBMISSIONS = 6
    self.table_name = "players"
    belongs_to :user, class_name: "User", optional: false, validate: true
    belongs_to :profile, class_name: "Profile", inverse_of: :players, optional: false, validate: true
    belongs_to :tournament, class_name: "Tournaments::Tournament", inverse_of: :players, optional: false, validate: true
    belongs_to :pokemon_team, class_name: "PokemonTeam", optional: true

    validates :in_game_name, presence: true
    validates :profile_id, presence: true
    validates :tournament_id, presence: true
    validates :profile_id, uniqueness: { scope: :tournament_id, case_sensitive: true, message: I18n.t("tournament.registration.already_registered") }
    validates :user_id, uniqueness: { scope: :tournament_id, case_sensitive: true, message: I18n.t("tournament.registration.already_registered") }
    delegate :username, to: :profile

    before_create :set_user_id_from_profile

    scope :checked_in, -> { where.not(checked_in_at: nil) }
    scope :checked_in_and_submitted_team_sheet, -> { where.not(pokemon_team_id: nil).where.not(checked_in_at: nil) }
    scope :not_checked_in_and_submitted_team_sheet, -> { where(pokemon_team_id: nil).where(checked_in_at: nil) }
    scope :checked_in_and_not_submitted_team_sheet, -> { where(pokemon_team_id: nil).where.not(checked_in_at: nil) }
    scope :not_checked_in_or_not_submitted_team_sheet, -> { where(pokemon_team_id: nil).where(checked_in_at: nil) }
    scope :checked_in, -> { where.not(checked_in_at: nil) }
    scope :not_checked_in, -> { where(checked_in_at: nil) }
    scope :not_dropped_and_not_disqualified, -> { where(dropped: false, disqualified: false) }

    def checked_in?
      checked_in_at.present?
    end

    def ready?
      checked_in? && pokemon_team.present?
    end

    def check_in!
      raise "Player is already checked in." if checked_in?
      raise "Check in is not open for this tournament." unless tournament.check_in_start_at <= Time.current.utc
      raise "Check in is closed for this tournament." unless tournament.started_at.blank? || tournament.late_registration == true

      update!(checked_in_at: Time.current.utc)
    end

    def submit_team!(pokemon_team:)
      update!(pokemon_team:)
    end

    def calculate_resistance!(phase:)
      self.resistance = calculate_resistance(phase:)
      save!
    end

    private

    def set_user_id_from_profile
      self.user_id ||= profile.user_id
    end
  end
end
