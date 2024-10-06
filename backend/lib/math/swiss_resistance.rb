module Math
  class SwissResistance
    def self.calculate(player:, phase:)
      raise ArgumentError, "phase must be a Phases::Swiss" unless phase.is_a?(Phases::Swiss)

      raise ArgumentError, "player must be a Tournaments::Player" unless player.is_a?(Tournaments::Player)

      raise ArgumentError, "player must be part of the phase" unless phase.players.include?(player)

      player_matches = phase.matches.where(player_one: player).or(phase.matches.where(player_two: player))

      opponents = player_matches.flat_map { |match| [match.player_one, match.player_two] }.uniq.compact - [player]
      total_opponent_game_wins = opponents.sum(&:game_wins)
      total_opponent_match_games = opponents.sum { |opponent| opponent.game_wins + opponent.game_losses }

      return (total_opponent_game_wins.to_f / total_opponent_match_games) * 100 if total_opponent_match_games > 0

      0
    end
  end
end
