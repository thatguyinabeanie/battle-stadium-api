module Tournaments
  class Round < ApplicationRecord
    self.table_name = "rounds"
    belongs_to :phase, class_name: "Phases::BasePhase", inverse_of: :rounds
    has_many :matches, class_name: "Tournaments::Match", dependent: :destroy, inverse_of: :round

    validates :phase, presence: true
    validates :phase, uniqueness: { scope: :round_number }

    validates :round_number, presence: true
    validates :round_number, uniqueness: { scope: :phase_id }

    delegate :players, to: :phase

    def seed_round
      raise "Round is already seeded" if matches.any?
      if round_number == 1
        players = phase.players.shuffle
        players.each_slice(2) do |player1, player2|
          matches.create!(player1:, player2:)
        end
      else

      end
    end

    def end!
      raise "Round has already ended" if ended_at.present?
      raise "Matches are still in progress" if matches.in_progress.any?
      self.ended_at = Time.current.utc
      save!
    end

    def end
      return if ended_at.present? || matches.in_progress.any?

      self.ended_at = Time.current.utc
      save!
    end
  end
end
