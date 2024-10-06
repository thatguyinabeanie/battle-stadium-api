module Math
  class SwissResistance

    def self.calculate(player:, phase:)
      self.validate(player:, phase:)
      total_wins = player.game_wins
      total_losses = player.game_losses
      total_games_played = total_wins + total_losses

      return total_wins.to_f / total_games_played if total_games_played > 0

      0
    end

    def self.calculate_opponent(player:, phase:)
      self.validate(player:, phase:)
      matches = phase.matches.where(player_one: player, bye: true).or(phase.matches.where(player_two: player, bye: true))

      opponents = matches.flat_map { |match| [match.player_one, match.player_two] }.uniq.compact - [self]
      total_opponent_game_wins = opponents.sum(&:game_wins)
      total_opponent_match_games = opponents.sum { |opponent| opponent.game_wins + opponent.game_losses }

      return (total_opponent_game_wins.to_f / total_opponent_match_games) if total_opponent_match_games.positive?
    end

    def self.validate(player:, phase:)
      raise ArgumentError, "phase must be a Phases::Swiss" unless phase.is_a?(Phases::Swiss)
      raise ArgumentError, "player must be a Tournaments::Player" unless player.is_a?(Tournaments::Player)
      raise ArgumentError, "player must be part of the phase" unless phase.players.include?(player)
    end
  end
end
