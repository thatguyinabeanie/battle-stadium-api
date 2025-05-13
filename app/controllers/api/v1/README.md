# API V1 Controllers

This directory contains version 1 of the API controllers for Battle Stadium. These controllers expose the backend's resources as a RESTful JSON API, designed to be consumed by a modern frontend (e.g., Next.js/React).

## Architecture and Patterns
- **Inheritance**: All controllers inherit from `AbstractApplicationController`, which provides shared CRUD logic, error handling, authorization (via Pundit), and serialization.
- **Resource-Oriented**: Each controller manages a specific resource (e.g., tournaments, players, matches) and follows RESTful conventions (`index`, `show`, `create`, `update`, `destroy`).
- **Routing**: Endpoints are defined in `config/routes.rb` under the `/api/v1/` namespace.
- **Authorization**: Uses Pundit policies (see `app/policies/`) to enforce permissions for each action.
- **Serialization**: Uses custom serializers (see `app/serializers/`) to format JSON responses, including relationships and computed fields.
- **Pagination**: Controllers can enable pagination for large collections using Kaminari or similar gems.

## Adding or Extending Controllers
- To add a new resource, create a controller inheriting from `AbstractApplicationController`.
- Set the `klass` (model), `serializer_klass`, and define permitted params for strong parameterization.
- Override or extend actions as needed, but prefer to keep business logic in services or models.

## Example
```ruby
class Api::V1::PlayersController < Api::V1::AbstractApplicationController
  self.klass = Player
  self.serializer_klass = PlayerSerializer
  self.index_serializer_klass = PlayerSerializer

  private
  def permitted_params
    params.require(:player).permit(:name, :email, :tournament_id)
  end
end
```

## Best Practices
- Keep controllers thin; delegate complex logic to services or models.
- Use before actions for setup and authorization.
- Return clear, consistent JSON responses with appropriate status codes.
- Document custom endpoints and parameters in OpenAPI specs (see `openapi/v1/openapi.yaml`).

## Related
- See `app/serializers/` for serialization logic.
- See `app/policies/` for authorization policies.
- See `app/controllers/concerns/` for shared controller logic.
- See `openapi/v1/openapi.yaml` for API documentation. 