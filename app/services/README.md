# Services

This directory contains service objects used by Battle Stadium to encapsulate business logic that does not belong in models or controllers. Service objects help keep the codebase modular, testable, and maintainable.

## What is a Service Object?
A service object is a plain Ruby class that performs a specific business operation, often involving multiple models or complex workflows. Service objects are used to:
- Encapsulate logic that would otherwise make models or controllers "fat"
- Coordinate actions across multiple models
- Implement algorithms or workflows (e.g., tournament pairing)
- Improve testability and reusability

## Example: Swiss Pairing Service
- `swiss_pairing_service.rb`: Implements the Swiss pairing algorithm for tournaments. Responsible for pairing players in each round of a Swiss phase, ensuring fair and balanced matchups based on current standings.

```ruby
class SwissPairingService
  def initialize(tournament)
    @tournament = tournament
  end

  def pair_next_round
    # Implement Swiss pairing algorithm
  end
end
```

## When to Use a Service Object
- When logic involves multiple models or is too complex for a model callback
- When you need to perform a sequence of steps or a workflow
- When you want to keep controllers focused on HTTP concerns

## Best Practices
- Keep service objects focused on a single responsibility
- Use dependency injection for testability
- Return clear results or raise meaningful errors
- Document the expected inputs and outputs

## Related
- See `app/models/phases/` for where service objects are used in phase logic
- See `lib/math/` for supporting utilities (e.g., tiebreaker calculations)

## swiss_pairing_service.rb
Implements the Swiss pairing algorithm for tournaments. Responsible for pairing players in each round of a Swiss phase.

- `SwissPairingService#pair_next_round`: (To be implemented) Pairs players for the next round based on current standings.

## Usage
Service objects are used by controllers and models to keep business logic separate and maintainable. 