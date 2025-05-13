# Spec Directory

This directory contains tests for Battle Stadium, using RSpec as the primary testing framework. The test suite is organized to mirror the app structure, making it easy to find and write tests for any part of the codebase.

## Structure and Responsibilities
- `channels/`, `controllers/`, `models/`, etc.: Mirrors the app structure for targeted unit and functional tests.
- `factories/`: FactoryBot factories for generating test data. Factories are used to create valid model instances for tests.
- `support/`: Helpers, shared contexts, and custom matchers for tests. Place reusable test logic here.
- `integrations/`: Integration tests that cover workflows spanning multiple models or controllers.
- `requests/`: API request specs, testing endpoints and their responses.
- `validators/`: Specs for custom validators.
- `lib/`: Specs for custom library code in `lib/`.

## Types of Tests
- **Model Specs**: Test validations, associations, and business logic in models.
- **Controller Specs**: Test controller actions, responses, and side effects.
- **Request Specs**: Test API endpoints, including authentication, authorization, and JSON responses.
- **Integration Specs**: Test end-to-end workflows and interactions between components.
- **Factory Specs**: Ensure factories produce valid objects.

## Running Tests
Run all tests with:

```bash
rspec
```

You can run a specific test file or directory:

```bash
rspec spec/models/player_spec.rb
rspec spec/controllers/
```

## Best Practices
- Use factories for test data instead of fixtures.
- Keep tests isolated and independent.
- Use descriptive test names and contexts.
- Test both success and failure cases.
- Use `let` and `subject` for setup, and `before` blocks for shared context.
- Place shared helpers in `spec/support/` and require them in `rails_helper.rb`.

## Extending
- Add new specs in the appropriate subdirectory.
- Write tests for new features, bug fixes, and edge cases.
- Use shared examples and helpers to avoid duplication.

## Related
- See `rails_helper.rb` and `spec_helper.rb` for RSpec configuration.
- See `app/` for the code under test.
- See `FactoryBot` documentation for factory usage. 