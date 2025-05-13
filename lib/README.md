# Lib Directory

This directory contains custom libraries and utilities for Battle Stadium. These libraries provide reusable logic, integrations, and algorithms that are used throughout the application but do not fit into the standard Rails app structure.

## Structure and Responsibilities
- `auth/`: Authentication utilities, including Clerk integration, cookie signing, and Vercel token verification. Used by controllers and middleware to handle user authentication and authorization.
- `math/`: Mathematical utilities for tournament logic, such as Swiss resistance calculations and other algorithms used in pairing and ranking.
- `tasks/`: Custom Rake tasks for development, maintenance, or data migration. These tasks can be run via the Rails command line.

## Best Practices
- Keep libraries focused and modular. Each file should have a single responsibility.
- Use clear, descriptive names for modules and classes.
- Document the expected inputs, outputs, and usage of each utility.
- Write tests for library code in `spec/lib/`.

## Example Usage
```ruby
# Using SwissResistance in a phase model
resistance = Math::SwissResistance.calculate(player: player, phase: phase)
```

## Extending
- Add new libraries in a relevant subdirectory or create a new one if needed.
- Follow the naming and organizational conventions of existing code.

## Related
- See `lib/auth/README.md` and `lib/math/README.md` for details on each submodule.
- See `spec/lib/` for tests of library code. 