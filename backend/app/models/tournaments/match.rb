# app/models/match.rb
module Tournaments
  class Match < ApplicationRecord
    include ::MatchPlayersConcern
    self.table_name = "matches"
    belongs_to :player_one, class_name: "Tournaments::Player"
    belongs_to :player_two, class_name: "Tournaments::Player", optional: true
    belongs_to :bye, class_name: "Tournaments::Player", optional: true

    belongs_to :winner, class_name: "Tournaments::Player", optional: true
    belongs_to :loser, class_name: "Tournaments::Player", optional: true

    belongs_to :round, class_name: "Tournaments::Round", inverse_of: :matches
    delegate :phase, to: :round
    delegate :started_at, to: :round

    has_many :match_games, class_name: "Tournaments::MatchGame", dependent: :destroy, inverse_of: :match
    has_many :chat_messages, dependent: :nullify, inverse_of: :match, class_name: "ChatMessage"

    validates :round, presence: true, uniqueness: { scope: %i[player_one_id player_two_id] }

    delegate :phase, to: :round
    delegate :tournament, to: :phase
    delegate :organization, to: :tournament
    delegate :best_of, to: :phase

    validates :winner, inclusion: { in: ->(match) { [match.player_one, match.player_two, nil] }, message: "must be either player one, player two, or null" }

    validates :loser, inclusion: { in: ->(match) { [match.player_one, match.player_two, nil] }, message: "must be either player one, player two, or null" }

    scope :in_progress, -> { where(ended_at: nil) }

    def update_status
      player_one_wins = match_games.where(winner: player_one).count
      player_two_wins = match_games.where(winner: player_two).count
      required_wins = (best_of / 2.0).ceil

      if player_one_wins >= required_wins
        self.winner = player_one
        self.loser = player_two
        self.ended_at = Time.current
      elsif player_two_wins >= required_wins
        self.winner = player_two
        self.loser = player_one
        self.ended_at = Time.current
      else
        # Start a new match game if the match is not yet decided
        match_games.create!(game_number: match_games.count + 1)
      end

      save!
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
  end
end
