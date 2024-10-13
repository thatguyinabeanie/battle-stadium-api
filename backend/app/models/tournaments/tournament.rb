module Tournaments
  class Tournament < ApplicationRecord
    self.table_name = "tournaments"
    MINIMUM_PLAYER_COUNT = 4
    # High level tournament information
    # validates :name, presence: true
    belongs_to :organization, class_name: "Organization"
    belongs_to :game, class_name: "Game"
    belongs_to :format, class_name: "Tournaments::Format"

    validates :name, presence: true

    validates :organization, presence: true
    validates :organization_id, presence: true
    validates :game, presence: true
    validates :format, presence: true, if: -> { game.present? }
    has_many :phases, class_name: "Phases::BasePhase", dependent: :destroy_async
    belongs_to :current_phase, class_name: "Phases::BasePhase", optional: true

    has_many :matches, class_name: "Tournaments::Match", dependent: :destroy_async
    # Tournament Logistics Information
    validates :registration_end_at, presence: true, allow_nil: true, if: -> { late_registration == false }
    validates :late_registration, inclusion: { in: [true, false] }
    validates :check_in_start_at, presence: true, if: -> { start_at.present? }
    validate :check_in_start_at_before_start_at, if: -> { check_in_start_at.present? && start_at.present? }

    has_many :players, class_name: "Tournaments::Player", dependent: :destroy_async
    validates :player_cap, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
    validate :unique_limitless_id

    before_validation :set_defaults, on: :create
    before_save :ready_to_start?, if: -> { saved_change_to_started_at?(from: nil) }

    def start!
      cannot_start = "Cannot start tournament."
      raise "The tournament has no phases. #{cannot_start}" if phases.empty?
      raise "The tournament has no players. #{cannot_start}" if players.empty?
      raise "The tournament does not have the minimum required number of players. #{cannot_start}" if players.count < MINIMUM_PLAYER_COUNT

      self.current_phase = self.phases.order(order: :asc).first
      self.started_at = Time.current.utc
      self.save!

      self.current_phase.accept_players(players:)
      self.current_phase.start!
    rescue StandardError => e
      Rails.logger.error { "Failed to start tournament: #{e.full_message(highlight: false)}" }
      raise
    end

    def not_ready_reasons
      reasons = []
      if players.checked_in_and_submitted_team_sheet.count < MINIMUM_PLAYER_COUNT
        reasons << "The tournament does not have the minimum required number of players that are both checked in and have submitted a team sheet"
      end
      reasons << "The tournament does not have any phases." if phases.empty?
      reasons << "The tournament's first phase is not valid." unless !phases.empty? && phases.order(order: :asc).first.valid?
      reasons
    end

    def ready_to_start?
      return true if not_ready_reasons.empty?

      Rails.logger.error "The tournament is not ready to start. #{not_ready_reasons.join(' ')}"

      false
    end

    def check_in_start_at_before_start_at
      errors.add(:check_in_start_at, "must be before start_at") if check_in_start_at >= start_at
    end


    def registration_open?
      return false if registration_start_at.blank?

      check_registration_window = Time.current.utc >= registration_start_at && started_at.blank?
      return check_registration_window if player_cap.blank?

      players.count < player_cap && check_registration_window
    end

    def register(profile: , pokemon_team_id: nil)
      raise "User Profile must be provided." if profile.nil?
      raise "User Profile is already registered for the tournament" if players.exists?(profile_id: profile.id)
      raise "Tournament registration is closed." unless registration_open?

      players.create(profile:, pokemon_team_id:)
    end

    def unregister(profile:)
      raise "User Profile must be provided." if profile.nil?
      raise "User Profile is not registered for the tournament." unless players.exists?(profile_id: profile.id)

      players.find_by(profile_id: profile.id).destroy
    end

    def set_defaults
      self.name ||= "#{organization.name}'s Tournament ##{organization.tournaments.count + 1}" if organization.present?

      self.format ||= game.formats.last if game.present?

      return if start_at.blank?

      self.late_registration ||= true

      self.registration_start_at ||= start_at - 1.week
      self.registration_end_at ||= (start_at if late_registration)
      self.check_in_start_at ||= start_at - 1.hour
    end

    def unique_limitless_id
      return if limitless_id.nil?

      errors.add(:limitless_id, "has already been taken") if self.class.where(limitless_id:).exists?
    end
  end
end
