# App Directory

This directory contains the main application code for Battle Stadium, a Ruby on Rails backend for managing Pokémon VGC tournaments. Each subdirectory encapsulates a specific concern of the application, following Rails conventions and best practices.

## Structure and Responsibilities
- `assets/`: Static assets such as images, stylesheets, and configuration files for asset management. Used primarily for frontend integration or ActionCable features.
- `channels/`: Defines ActionCable channels for real-time features (e.g., chat, live updates). Includes base cable classes and custom channels.
- `controllers/`: Handles HTTP requests and responses. Divided into API versions (e.g., `api/v1/`) and concerns for shared logic. Controllers orchestrate the flow between models, services, and serializers.
- `jobs/`: Background jobs using ActiveJob. Handles asynchronous tasks such as saving chat messages or starting tournaments. Jobs are enqueued by controllers or models.
- `mailers/`: Defines mailers for sending emails. Inherits from `ApplicationMailer` and can be extended for notifications, confirmations, etc.
- `models/`: Domain models representing core entities (accounts, players, tournaments, matches, phases, etc.). Includes concerns for shared logic and subdirectories for specialized models (e.g., phases).
- `policies/`: Authorization policies using Pundit. Each policy defines permissions for a resource and is referenced by controllers.
- `serializers/`: JSON serialization logic for API responses. Serializers transform model data into API-friendly formats and can include relationships, computed fields, etc.
- `services/`: Business logic and service objects. Encapsulates complex operations (e.g., Swiss pairing) to keep controllers and models clean.
- `validators/`: Custom validators for model validations, extending ActiveModel::EachValidator.

## Architectural Notes
- The app is API-first, designed to be consumed by a modern frontend (e.g., Next.js/React).
- Follows Rails conventions for structure, but uses service objects and concerns to keep code modular and maintainable.
- Authorization is handled via Pundit policies, and serialization via custom serializers.

## Extending the App
- Add new features by creating models, controllers, and serializers in the appropriate subdirectories.
- Use service objects for business logic that doesn't belong in models or controllers.
- Add background jobs for asynchronous processing.
- Use concerns for shared logic across models or controllers.

## Related Documentation
- Each subdirectory contains its own README with more details and examples.
- See the root `README.md` for setup, development, and contribution guidelines. 