# app/models/match.rb
module Tournaments
  class Match < ApplicationRecord
    include ::MatchPlayersConcern
    self.table_name = "matches"

    belongs_to :phase, class_name: "Phases::BasePhase", inverse_of: :matches
    belongs_to :tournament, class_name: "Tournaments::Tournament", inverse_of: :matches
    belongs_to :round, class_name: "Tournaments::Round", inverse_of: :matches
    belongs_to :player_one, class_name: "Tournaments::Player", required: true
    belongs_to :player_two, class_name: "Tournaments::Player", optional: true
    belongs_to :winner, class_name: "Tournaments::Player", optional: true
    belongs_to :loser, class_name: "Tournaments::Player", optional: true

    has_many :match_games, class_name: "Tournaments::MatchGame", dependent: :destroy, inverse_of: :match
    has_many :chat_messages, dependent: :nullify, inverse_of: :match, class_name: "ChatMessage"

    delegate :started_at, to: :round
    delegate :organization, to: :tournament
    delegate :best_of, to: :phase

    validates :round, presence: true, uniqueness: { scope: %i[player_one_id player_two_id] }
    validates :winner, inclusion: { in: ->(match) { [match.player_one, match.player_two, nil] }, message: "must be either player one, player two, or null" }
    validates :bye, inclusion: { in: [true, false] }
    validates :bye, inclusion: { in: [true] }, if: -> { player_two.nil? }

    before_validation :set_defaults, on: :create

    after_create :create_initial_match_game

    scope :in_progress, -> { where(ended_at: nil) }

    def update_status
      player_one_wins = match_games.where(winner: player_one).count
      player_two_wins = match_games.where(winner: player_two).count
      required_wins = (best_of / 2.0).ceil

      if player_one_wins >= required_wins
        self.winner = player_one
        self.loser = player_two
        self.ended_at = Time.current.utc
      elsif player_two_wins >= required_wins
        self.winner = player_two
        self.loser = player_one
        self.ended_at = Time.current.utc
      else
        # Start a new match game if the match is not yet decided
        self.match_games.create!(game_number: match_games.count + 1)
      end

      self.save!
    end

    def check_in(player:)
      raise ArgumentError, "Cannot check in a player that is not part of the match." if [player_one, player_two].exclude?(player)
      time_now = Time.current.utc
      if player == player_one
        self.player_one_check_in = time_now
      else
        self.player_two_check_in = time_now
      end
      save!
    end

    def checked_in?(player:)
      if player == player_one
        player_one_check_in.present?
      elsif player == player_two
        player_two_check_in.present?
      else
        raise ArgumentError, "Cannot check in a player that is not part of the match."
      end
    end

    def set_defaults
      if self.bye
        self.player_two = nil
        self.ended_at = Time.current.utc
        self.winner = player_one
        self.loser = nil
      end
      self.phase_id ||= round.phase_id if round.present?
      self.tournament_id ||= round.phase.tournament_id if round.present?
    end

    def create_initial_match_game
      return match_games.create!(game_number: 1) unless bye

      player_one.update!(game_wins: player_one.game_wins + 2)
    end
  end
end
