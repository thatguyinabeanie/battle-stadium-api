# Controllers

This directory contains the controllers for Battle Stadium, responsible for handling HTTP requests, orchestrating business logic, and returning responses (usually JSON for the API).

## Structure
- `api/v1/`: Versioned API controllers for the backend. Each controller manages a specific resource (e.g., tournaments, players) and inherits shared logic from `AbstractApplicationController`.
- `concerns/`: Shared controller logic, such as authentication or parameter filtering, that can be included in multiple controllers.
- `application_controller.rb`: The base controller for all others. Sets up global behaviors (e.g., error handling, authentication hooks).

## Controller Lifecycle
1. **Routing**: Requests are routed to controllers via `config/routes.rb`.
2. **Before Actions**: Common setup (e.g., authentication, object lookup) is handled by `before_action` hooks.
3. **Action Methods**: Standard RESTful actions (`index`, `show`, `create`, `update`, `destroy`) are implemented, often using shared logic from abstract controllers.
4. **Authorization**: Pundit policies are used to check permissions for each action.
5. **Serialization**: Responses are serialized using custom serializers in `app/serializers/`.

## Best Practices
- Keep controllers thin: delegate business logic to services or models.
- Use concerns for shared logic (e.g., authentication, pagination).
- Use strong parameters and custom permitted params methods for security.
- Handle errors gracefully and return meaningful HTTP status codes.

## Extending
- To add a new resource, create a controller in the appropriate API version directory and inherit from the relevant base controller.
- Define the resource class, serializer, and permitted params.
- Add custom actions as needed, but prefer RESTful conventions.

## Example
```ruby
class Api::V1::TournamentsController < Api::V1::AbstractApplicationController
  self.klass = Tournament
  self.serializer_klass = TournamentSerializer

  private
  def permitted_params
    params.require(:tournament).permit(:name, :start_date, :end_date)
  end
end
```

## Related
- See `app/controllers/api/v1/README.md` for API-specific patterns.
- See `app/serializers/` for serialization logic.
- See `app/policies/` for authorization policies.
- See `app/controllers/concerns/` for reusable controller modules. 