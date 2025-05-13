# Auth Utilities

This directory contains authentication-related utilities for Battle Stadium. These modules provide integration with third-party authentication providers, token verification, and secure cookie handling.

## Clerk Integration
- `clerk/session.rb`: Handles authentication via Clerk, verifying session tokens and associating Clerk users with local accounts. Used by controllers to authenticate API requests.
- `clerk/token_verifier.rb`: Verifies Clerk JWT tokens, ensuring they are valid and unexpired. Used internally by the session module.
- `clerk/webhook.rb`: Handles Clerk webhooks for user events (e.g., user created, deleted). Can be used to synchronize user data with Clerk.

## Cookies & Vercel
- `cookies/signature.rb`: Utility for creating and verifying signed cookies. Used for secure session management and CSRF protection.
- `vercel/token_verifier.rb`: Verifies tokens for Vercel deployments, enabling secure integration with Vercel-hosted frontends.

## Usage Example
```ruby
# Authenticating a request in a controller
account = Auth::Clerk::Session.authenticate!(request: request)
```

## Extending
- To add a new authentication provider, create a new subdirectory and implement the required token verification and session management logic.
- Update controllers or middleware to use the new provider as needed.

## Best Practices
- Always validate and sanitize external tokens before trusting user data.
- Handle authentication errors gracefully and return appropriate HTTP status codes.
- Keep authentication logic separate from business logic for maintainability.

## Related
- See `app/controllers/api/v1/abstract_application_controller.rb` for integration points.
- See `lib/math/` for unrelated but similarly structured utilities.
- See `spec/lib/auth/` for tests of authentication utilities. 