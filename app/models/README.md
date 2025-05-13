# Models

This directory contains the core domain models for Battle Stadium. Models represent the main entities and business logic of the application, and are responsible for data validation, associations, and domain-specific methods.

## Structure and Responsibilities
- **Entity Models**: Each file represents a database-backed entity (e.g., Account, Player, Tournament, Match, Phase, etc.).
- **Associations**: Models define relationships (e.g., `has_many`, `belongs_to`) to express how entities are connected (e.g., a Tournament has many Phases, a Player belongs to a Tournament).
- **Validations**: Models enforce data integrity using ActiveRecord validations (e.g., presence, uniqueness, custom validators).
- **Callbacks**: Use lifecycle hooks (e.g., `before_save`, `after_create`) for side effects, but prefer service objects for complex logic.
- **Concerns**: Shared logic is extracted into modules in `app/models/concerns/` and included in multiple models.
- **Phases**: The `phases/` subdirectory contains specialized models for tournament phases (e.g., Swiss, Single Elimination), all inheriting from `BasePhase`.

## Best Practices
- Keep models focused on business logic and data integrity.
- Use concerns for reusable logic across models.
- Delegate complex operations to service objects.
- Avoid fat models by splitting responsibilities where possible.

## Example
```ruby
class Player < ApplicationRecord
  belongs_to :tournament
  has_many :matches
  validates :name, presence: true
  # ...
end
```

## Extending
- To add a new model, create a file in this directory and generate the corresponding migration.
- Use concerns for logic shared across multiple models.
- Add associations and validations as needed.

## Related
- See `app/models/phases/` for tournament phase logic and extensibility.
- See `app/models/concerns/` for shared model logic.
- See `db/migrate/` for database migrations.
- See `app/services/` for business logic that doesn't belong in models. 