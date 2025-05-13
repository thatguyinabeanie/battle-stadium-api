# Profiles Feature

## Purpose
The profiles feature provides a flexible identity layer for users (accounts) in the system. Each account can have one or more profiles, which are used to represent a user's identity in tournaments, teams, chat, and other contexts. This allows for features like multiple personas per account, default profiles, and integration with external profile systems (e.g., RK9).

## Key Models and Relationships

- **Profile (`profile.rb`, `abstract_profile.rb`)**
  - Inherits from `AbstractProfile`, which contains the main logic.
  - Each profile belongs to an `Account`.
  - A profile can be associated with many `Player` records (tournament entries) and many `PokemonTeam` records.
  - Profiles have a unique `username` and can be marked as the `default` for an account.
  - Only one profile per account can be the default.
  - Uses `friendly_id` for pretty URLs based on the username.

- **Account (`account.rb`)**
  - Has one `default_profile` and can have many `profiles`.
  - When an account is created, a default profile is automatically created.
  - Provides delegation for username and profile lookups.

- **Player (`player.rb`)**
  - Each player (tournament participant) is linked to a profile.
  - A profile can only be registered once per tournament.
  - The player's account is set from the profile.

- **PokemonTeam (`pokemon_team.rb`)**
  - Each team is associated with a profile, linking teams to user identities.

- **ChatMessage (`chat_message.rb`)**
  - Each chat message is linked to a profile, so chat is always associated with a user identity.

## How Profiles Are Used

- **Tournament Registration**
  - When registering for a tournament, a profile is required.
  - The system ensures a profile can only be registered once per tournament and that an account cannot register multiple profiles for the same tournament.

- **Team Management**
  - Teams are linked to profiles, so users can manage multiple teams under different profiles.

- **Chat and Messaging**
  - Chat messages are associated with profiles, allowing for clear attribution in chat logs.

- **Default Profile**
  - Each account has a default profile, used for most actions unless another is specified.

- **External Profiles**
  - There is support for external profile types (e.g., `Rk9Profile`), which inherit from `AbstractProfile`.

## Validations and Constraints

- **Unique Username:** Each profile must have a unique username.
- **One Default Profile:** Only one profile per account can be marked as default.
- **Presence:** Profiles must be present for many actions (e.g., registration, chat).

## Extensibility

- The system is designed to allow for multiple profile types (using STI—Single Table Inheritance).
- You can add new profile types by subclassing `AbstractProfile`.

## Example Usage

- **Creating an Account and Default Profile:**
  - When an account is created, a default profile is automatically created with the account's username.
- **Registering for a Tournament:**
  - `tournament.register!(profile: my_profile, in_game_name: ..., pokemon_team_id: ...)`
- **Sending a Chat Message:**
  - `ChatMessage.create!(profile: my_profile, match: ..., content: ...)`

---

For more details, see the source files in this directory and related models in `app/models/`. 