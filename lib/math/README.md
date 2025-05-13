# Math Utilities

This directory contains mathematical utilities used throughout Battle Stadium, primarily for tournament logic such as tiebreakers and pairing algorithms.

## swiss_resistance.rb
Implements the Swiss resistance calculation, a tiebreaker used in Swiss-style tournaments to rank players with identical records. The resistance score reflects the strength of a player's opponents, rewarding those who faced tougher competition.

### Key Methods
- `SwissResistance.calculate(player:, phase:)`: Calculates a player's resistance as the ratio of their game wins to total games played. Returns 0 if the player has not played any games.
- `SwissResistance.calculate_opponent(player:, phase:)`: Calculates the average resistance of a player's opponents, used as a secondary tiebreaker.
- `SwissResistance.validate(player:, phase:)`: Ensures the player and phase are of the correct types and that the player is part of the phase.

### Algorithm
1. For each player, compute their resistance as `game_wins / (game_wins + game_losses)`.
2. For opponent resistance, sum the resistances of all opponents and average them.
3. Used to break ties in Swiss standings, ensuring fairer rankings.

### Usage Example
```ruby
resistance = Math::SwissResistance.calculate(player: player, phase: phase)
opponent_resistance = Math::SwissResistance.calculate_opponent(player: player, phase: phase)
```

## Extending
- Add new algorithms or utilities as needed for other tournament formats or tiebreakers.
- Keep each utility focused and well-documented.

## Related
- Used by `app/models/phases/swiss.rb` for ranking and tiebreakers.
- See `app/services/swiss_pairing_service.rb` for pairing logic.
- See `spec/lib/math/` for tests of math utilities. 