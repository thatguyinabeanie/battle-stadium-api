module Math
  class SwissResistance
    def self.calculate(player:, phase:)
      raise ArgumentError, "phase must be a Phases::Swiss" unless phase.is_a?(Phases::Swiss)
      raise ArgumentError, "player must be a Tournaments::Player" unless player.is_a?(Tournaments::Player)
      raise ArgumentError, "player must be part of the phase" unless phase.players.include?(player)

      total_wins = player.game_wins
      total_losses = player.game_losses

      # Include bye matches as wins
      phase.matches.where(player_one: player, bye: true).or(phase.matches.where(player_two: player, bye: true)).each do |match|
        total_wins += match.best_of / 2 + 1
      end

      return total_wins.to_f / (total_wins + total_losses) if total_wins + total_losses > 0

      0
    end
  end
end
