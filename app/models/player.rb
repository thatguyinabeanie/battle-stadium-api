
class Player < ApplicationRecord
  MAX_POKEMON_SUBMISSIONS = 6
  self.table_name = "players"
  def self.policy_class
    PlayerPolicy
  end
  belongs_to :account, class_name: "Account", optional: true, validate: true
  belongs_to :profile, class_name: "Profile", inverse_of: :players, optional: false, validate: true
  belongs_to :tournament, class_name: "Tournament", inverse_of: :players, optional: false, validate: true
  belongs_to :pokemon_team, class_name: "PokemonTeam", optional: true

  has_many :matches, class_name: "Match", foreign_key: "player_one_id", inverse_of: :player_one, dependent: :nullify

  validates :in_game_name, presence: true
  validates :profile_id, presence: true
  validates :tournament_id, presence: true
  validates :profile_id, uniqueness: { scope: :tournament_id, message: I18n.t("tournament.registration.profile_already_registered") }
  validates :account_id, uniqueness: { scope: :tournament_id, message: I18n.t("tournament.registration.account_already_registered") }
  validates :show_country_flag, inclusion: { in: [true, false] }

  delegate :username, to: :profile

  before_create :set_account_id_from_profile

  scope :checked_in, -> { where.not(checked_in_at: nil) }
  scope :submitted_team_sheet, -> { where.not(pokemon_team_id: nil) }
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

    private

  def set_account_id_from_profile
    self.account_id ||= profile.account_id
  end
end
