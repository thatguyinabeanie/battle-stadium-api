module Tournaments
  class Round < ApplicationRecord
    self.table_name = "rounds"
    belongs_to :phase, class_name: "Phases::BasePhase", inverse_of: :rounds
    has_many :matches, class_name: "Tournaments::Match", dependent: :destroy, inverse_of: :round

    validates :phase, presence: true
    validates :phase, uniqueness: { scope: :round_number }

    validates :round_number, numericality: { only_integer: true, greater_than: 0 }, presence: true
    validates :round_number, uniqueness: { scope: :phase_id }

    delegate :players, to: :phase

    class << self
      def create_initial_round(phase)
        round = phase.rounds.create!(round_number: 1)
        players = phase.players.not_dropped_and_not_disqualified
        create_matches(round:, players:)
        round
      end

      def create_round(phase)
        round_number = phase.rounds.count + 1
        round = phase.rounds.create!(round_number:)
        players_by_record = phase.players.not_dropped_and_not_disqualified
                                         .group_by { |player| [player.round_wins, player.round_losses] }

        players_by_record = players_by_record.sort_by { |record, _| [-record[0], record[1]] }.to_h

        players = []
        players_by_record.each do |_, group|
          players.concat(group.sort_by { |player| -(player.resistance || 0) })
        end

        create_matches(round:, players:)
        round
      end

      def create_matches(round:, players:)
        # Group players by their records
        players_by_record = players.group_by { |player| [player.round_wins, player.round_losses] }

        # Sort each group by resistance
        players_by_record.each do |record, group|
          players_by_record[record] = group.sort_by { |player| -player.resistance }
        end

        matches = []
        previous_unpaired_player = nil

        players_by_record.keys.sort.reverse_each do |record|
          group = players_by_record[record]

          # If there's an unpaired player from the previous group, pair them with the highest resistance player in the current group
          if previous_unpaired_player
            player_two = group.shift
            matches << { player_one: previous_unpaired_player, player_two: }
            previous_unpaired_player = nil
          end

          # Pair the remaining players in the current group
          while group.size > 1
            player_one = group.shift
            player_two = group.pop
            matches << { player_one:, player_two: }
          end

          # If there's an unpaired player in the current group, set them as the previous_unpaired_player
          if group.size == 1
            previous_unpaired_player = group.shift
          end
        end

        # If there's still an unpaired player after processing all groups, give them a bye
        if previous_unpaired_player
          matches << { player_one: previous_unpaired_player, player_two: nil } # player_two is nil to indicate a bye
        end

        # Create matches in the round
        matches.each do |match|
          round.matches.create!(player_one: match[:player_one], player_two: match[:player_two], bye: match[:player_two].nil?)
        end
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
