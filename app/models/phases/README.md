# Phase System

This directory contains the implementation of tournament phases for Battle Stadium. Each phase represents a distinct stage in a tournament (e.g., Swiss, Single Elimination), and is responsible for managing rounds, player progression, and phase-specific logic.

## Structure
- `BasePhase`: Abstract class providing shared logic and interface for all phases. Handles associations (to tournaments, rounds, matches, players), validations, and default behaviors. Subclasses must implement `start!` (to begin the phase) and `accept_players` (to register players for the phase).
- `Swiss`: Implements Swiss-style tournament logic, including round management, player acceptance, and tiebreaker calculation (using `Math::SwissResistance`). Handles the lifecycle of a Swiss phase, such as starting, ending rounds, and creating new rounds.
- `SingleEliminationBracket`: Placeholder for single elimination logic (to be implemented). Intended to manage bracket creation and progression.

## Phase Lifecycle
1. **Creation**: A phase is created and associated with a tournament.
2. **Player Acceptance**: Players are registered to the phase using `accept_players`.
3. **Start**: The phase is started with `start!`, which initializes rounds and sets up the phase state.
4. **Round Management**: Rounds are created, ended, and advanced as the phase progresses.
5. **Completion**: The phase ends when all rounds are completed or a winner is determined.

## Extending the Phase System
- To add a new phase type, subclass `BasePhase` and implement required methods (`start!`, `accept_players`, and any phase-specific logic).
- Register the new phase in the system as needed (e.g., in controllers or services that manage tournament flow).
- Use the `set_defaults` method to initialize phase-specific defaults.

## Example
```ruby
module Phases
  class DoubleElimination < BasePhase
    def start!
      # Custom logic for double elimination
    end
    def accept_players(players:)
      # Custom player registration logic
    end
  end
end
```

## Related
- See `lib/math/swiss_resistance.rb` for Swiss tiebreaker logic and resistance calculations.
- See `app/services/swiss_pairing_service.rb` for Swiss pairing logic and round generation.
- See `app/models/player.rb` and `app/models/round.rb` for related entities. 