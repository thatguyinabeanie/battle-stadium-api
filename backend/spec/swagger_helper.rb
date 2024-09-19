# frozen_string_literal: true

require "rails_helper"
require "support/constants"

ID_PROPERTY = { id: { type: :integer, format: :int64 } }.freeze
UUID_TYPE = { type: :string, format: "uuid" }.freeze
UUID_PROPERTY = { id: UUID_TYPE }.freeze
NAME_PROPERTY = { name: { type: :string } }.freeze
ID_NAME_REQUIRED = %w[id name].freeze

COMPONENT_SCHEMA_ORGANIZATION = "#/components/schemas/Organization"
COMPONENT_SCHEMA_FORMAT = "#/components/schemas/Format"
COMPONENT_SCHEMA_GAME = "#/components/schemas/Game"

ID_NAME_PROPERTIES = {
  id: ID_PROPERTY[:id],
  name: NAME_PROPERTY[:name]
}.freeze

UUID_NAME_PROPERTIES = {
  id: UUID_PROPERTY[:id],
  name: NAME_PROPERTY[:name]
}.freeze

FORMAT_SCHEMA = {
  type: :object,
  title: "Format",
  properties: ID_NAME_PROPERTIES
}.freeze

GAME_SCHEMA = {
  type: :object,
  title: "Game",
  properties: ID_NAME_PROPERTIES,
  required: ID_NAME_REQUIRED
}.freeze

GAME_REQUEST = {
  type: :object,
  title: "GameRequest",
  properties: ID_NAME_PROPERTIES,
  required: %w[name]
}.freeze

GAME_DETAILS_SCHEMA = {
  type: :object,
  title: "Game Details",
  properties: GAME_SCHEMA[:properties].merge(
    formats: { type: :array, items: { "$ref" => COMPONENT_SCHEMA_FORMAT } }
  ),
  required: (GAME_SCHEMA[:required] + %w[formats])
}.freeze

SIMPLE_USER_SCHEMA = {
  type: :object,
  title: "Simple User",
  properties: {
    username: { type: :string },
    pronouns: { type: :string },
    image_url: { type: :string, nullable: true }
  },
  required: %w[username pronouns]
}.freeze

USER_SCHEMA = SIMPLE_USER_SCHEMA.deep_merge(
  {
    title: "User",
    properties: UUID_PROPERTY,
    required: %w[username pronouns id] + SIMPLE_USER_SCHEMA[:required]
  }
)

SIMPLE_USER_DETAILS_SCHEMA = SIMPLE_USER_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Simple User Details",
    properties: {
      email: { type: :string },
      first_name: { type: :string },
      last_name: { type: :string },
      image_url: { type: :string, nullable: true }
    },
    required: %w[email first_name last_name ] + SIMPLE_USER_SCHEMA[:required]
  }
).freeze

USER_DETAILS_SCHEMA = SIMPLE_USER_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "User Details",
    properties: UUID_PROPERTY,
    required: %w[id] + SIMPLE_USER_DETAILS_SCHEMA[:required]
  }
).freeze

USER_ME = USER_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "User Me",
    properties: {
      organizations: { type: :array, items: { "$ref" => COMPONENT_SCHEMA_ORGANIZATION } }
    },
    required: %w[organizations] + USER_DETAILS_SCHEMA[:required]
  }
).freeze

USER_REQUEST = SIMPLE_USER_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "User Request",
    properties: UUID_PROPERTY,
    required: SIMPLE_USER_DETAILS_SCHEMA[:required]
  }
).freeze

USER_POST_REQUEST = SIMPLE_USER_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "User Request",
    properties: UUID_PROPERTY,
    required: SIMPLE_USER_DETAILS_SCHEMA[:required]
  }
).freeze

USER_LOGIN_RESPONSE = {
  type: :object,
  title: "User Login Response",
  properties: UUID_PROPERTY.merge(
    username: { type: :string },
    pronouns: { type: :string },
    email: { type: :string, format: "email" },
    first_name: { type: :string },
    last_name: { type: :string },
    token: { type: :string, format: "jwt" }
  ),
  required: %w[id username pronouns email token first_name last_name]
}.freeze

REGISTRATION_RESPONSE = {
  type: :object,
  title: "Registration Response",
  properties: UUID_PROPERTY.merge(
    email: { type: :string, format: "email" },
    username: { type: :string },
    first_name: { type: :string },
    last_name: { type: :string },
    created_at: { type: :string, format: DATE_TIME_TYPE },
    updated_at: { type: :string, format: DATE_TIME_TYPE },
    pronouns: { type: :string, nullable: true },
    jti: { type: :string, format: "jwt" },
    name: { type: :string, nullable: true },
    image: { type: :string, nullable: true },
    admin: { type: :boolean }
  ),
  required: %w[id email username first_name last_name created_at updated_at pronouns jti name image]
}.freeze

ORGANIZATION_SCHEMA = {
  type: :object,
  title: "Organization",
  properties: {
    owner: { "$ref" => "#/components/schemas/User" , :nullable => true},
    description: { type: :string, nullable: true },
    logo_url: { type: :string, nullable: true, format: "uri" },
    partner: { type: :boolean },
    slug: { type: :string}
  }.merge(ID_NAME_PROPERTIES),
  required: ID_NAME_REQUIRED + %w[owner description logo_url slug]
}.freeze

ORGANIZATION_DETAILS_SCHEMA = {
  type: :object,
  title: "Organization Details",
  properties: ORGANIZATION_SCHEMA[:properties],
  required: ORGANIZATION_SCHEMA[:required]
}.freeze

TOURNAMENT_PROPERTIES = {
  player_cap: { type: :integer, nullable: true },
  player_count: { type: :integer },
  end_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
  started_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
  ended_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
  registration_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
  registration_end_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
  late_registration: { type: :boolean }
}.freeze

TOURNAMENT_SCHEMA = {
  type: :object,
  title: "Tournament",
  properties: {
    start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    organization: { "$ref" => COMPONENT_SCHEMA_ORGANIZATION },
    format: { "$ref" => COMPONENT_SCHEMA_FORMAT },
    game: { "$ref" => COMPONENT_SCHEMA_GAME }
  }.merge(ID_NAME_PROPERTIES).merge(TOURNAMENT_PROPERTIES),
  required: ID_NAME_REQUIRED + %w[player_cap organization format game start_at player_count registration_start_at registration_end_at late_registration]
}.freeze

TOURNAMENT_DETAILS_SCHEMA = {
  type: :object,
  title: "Tournament Details",
  properties: ID_NAME_PROPERTIES.merge(
    {
      autostart: { type: :boolean },
      start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
      end_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
      organization: { "$ref" => COMPONENT_SCHEMA_ORGANIZATION },
      format: { "$ref" => COMPONENT_SCHEMA_FORMAT },
      game: { "$ref" => COMPONENT_SCHEMA_GAME },
      check_in_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
      late_registration: { type: :boolean },
      teamlists_required: { type: :boolean },
      open_team_sheets: { type: :boolean }
    }
  ).merge(TOURNAMENT_PROPERTIES),
  required: TOURNAMENT_SCHEMA[:required] + %w[
    start_at player_cap autostart
    teamlists_required open_team_sheets
    check_in_start_at
    late_registration registration_start_at registration_end_at
  ]
}.freeze

TOURNAMENT_REQUEST = {
  type: :object,
  title: "Tournament Request",
  properties: ID_NAME_PROPERTIES.merge(
    {
                                         game_id: { type: :integer, format: :int64 },
                                         format_id: { type: :integer, format: :int64 },
                                         autostart: { type: :boolean },
                                         start_at: { type: :string, format: DATE_TIME_TYPE },
                                         player_cap: { type: :integer, nullable: true },
                                         registration_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
                                         registration_end_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
                                         late_registration: { type: :boolean },
                                         check_in_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
                                         open_team_sheets: { type: :boolean },
                                         teamlists_required: { type: :boolean }
                                       }),
  required: %w[name game_id format_id autostart start_at player_cap registration_start_at registration_end_at late_registration check_in_start_at open_team_sheets teamlists_required]
}.freeze

TOURNAMENT_POST_REQUEST = {
  type: :object,
  title: "Tournament Post Request",
  properties: {
    organization_id: { type: :integer, format: :int64},
    name: { type: :string },
    game_id: { type: :integer, format: :int64 },
    format_id: { type: :integer, format: :int64 },
    autostart: { type: :boolean },
    start_at: { type: :string, format: DATE_TIME_TYPE },
    player_cap: { type: :integer, nullable: true },
    registration_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    registration_end_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    late_registration: { type: :boolean },
    check_in_start_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    open_team_sheets: { type: :boolean },
    teamlists_required: { type: :boolean }
  },
  required: %w[organization_id name game_id format_id autostart player_cap registration_start_at registration_end_at late_registration check_in_start_at open_team_sheets teamlists_required]
}.freeze

POKEMON_SCHEMA = {
  type: :object,
  title: "Pokemon",
  properties: ID_NAME_PROPERTIES.merge(
    nickname: { type: :string, nullable: true },
    ability: { type: :string },
    tera_type: { type: :string },
    nature: { type: :string },
    held_item: { type: :string, nullable: true },
    move1: { type: :string, nullable: true },
    move2: { type: :string, nullable: true },
    move3: { type: :string, nullable: true },
    move4: { type: :string, nullable: true }
  ),
  required: ID_NAME_REQUIRED + %w[ability tera_type nature held_item move1 move2 move3 move4]
}.freeze

PLAYER_REQUEST = {
  type: :object,
  title: "Player Request",
  properties: {
    user_id: UUID_TYPE,
    in_game_name: { type: :string }
  },
  required: %w[user_id in_game_name]
}.freeze

PLAYER_SCHEMA = {
  type: :object,
  title: "Player",
  properties: {
    id: { type: :integer, format: :int64 },
    user: { "$ref" => "#/components/schemas/User" },
    in_game_name: { type: :string }
    # checked_in: { type: :boolean },
    # checked_in_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    # team_sheet_submitted: { type: :boolean },
    # team_sheet_submitted_at: { type: :string, format: DATE_TIME_TYPE, nullable: true }
  },
  # required: %w[id user in_game_name checked_in checked_in_at team_sheet_submitted team_sheet_submitted_at]
  required: %w[id user in_game_name]
}.freeze

PLAYER_DETAILS_SCHEMA = {
  type: :object,
  title: "Player Details",
  properties: PLAYER_SCHEMA[:properties].merge(
    {
      # pokemon: { type: :array, items: { '$ref' => '#/components/schemas/Pokemon' } }
      #
    }
  ),
  # required: PLAYER_SCHEMA[:required] + %w[pokemon]
  required: PLAYER_SCHEMA[:required]
}.freeze

ROUND_SCHEMA = {
  type: :object,
  title: "Round",
  properties: ID_PROPERTY.merge(
    phase_id: { type: :integer, format: :int64 },
    round_number: { type: :integer, format: :int64 },
    started_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    ended_at: { type: :string, format: DATE_TIME_TYPE, nullable: true }
  ),
  required: %w[id phase_id round_number started_at ended_at]
}.freeze

PHASE_SCHEMA = {
  type: :object,
  title: "Phase",
  properties: ID_NAME_PROPERTIES.merge(
    order: { type: :integer, format: :int64 },
    type: { type: :string },
    tournament_id: { type: :integer, format: :int64 },
    number_of_rounds: { type: :integer},
    best_of: { type: :integer},
    started_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    ended_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    created_at: { type: :string, format: DATE_TIME_TYPE },
    updated_at: { type: :string, format: DATE_TIME_TYPE }
  ),
  required: ID_NAME_REQUIRED + %w[order tournament_id number_of_rounds best_of started_at ended_at]
}.freeze

PHASE_DETAILS_SCHEMA = {
  type: :object,
  title: "Phase Details",
  properties: PHASE_SCHEMA[:properties].merge(
    players: { type: :array, items: { "$ref" => "#/components/schemas/Player" } },
    rounds: { type: :array, items: { "$ref" => "#/components/schemas/Round" } }
  ),
  required: PHASE_SCHEMA[:required] + %w[players rounds]
}.freeze

GET_SESSION_REQUEST = {
  type: :object,
  title: "Get Session Params",
  properties: {
    token: { type: :string, format: "jwt" }
  },
  required: %w[token]
}.freeze

SESSION = {
  type: :object,
  title: "Session",
  properties: {
    username: { type: :string },
    token: { type: :string, format: "jwt" },
    user_id: UUID_TYPE,
    expires_at: { type: :string, format: DATE_TIME_TYPE }
  },
  required: %w[token user_id expires_at]
}.freeze

CREATE_SESSION = {
  type: :object,
  title: "Create Session",
  properties: {
    user_id: UUID_TYPE,
    session_token: { type: :string, format: "jwt" },
    expires_at: { type: :string, format: DATE_TIME_TYPE }
  },
  required: %w[user_id]
}.freeze

SESSION_AND_USER = {
  type: :object,
  title: "Session And User",
  properties: {
    session: { "$ref" => "#/components/schemas/Session" },
    user: { "$ref" => "#/components/schemas/UserDetails" }
  },
  required: %w[session user]
}.freeze


ERROR = {
  type: :object,
  properties: {
    error: { type: :string }
  },
  required: %w[error]
}.freeze

MESSAGE = {
  type: :object,
  properties: {
    message: { type: :string }
  },
  required: %w[message]
}.freeze


PAGE_PARAMETER = {
  name: :page,
  in: :query,
  type: :integer,
  description: "Page number for pagination",
  required: true,
}

PER_PAGE_PARAMETER = {
  name: :per_page,
  in: :query,
  type: :integer,
  description: "Number of items per page for pagination",
  required: true,
}

PAGINATION_RESPONSE = {
  type: :object,
  properties: {
    current_page: { type: :integer },
    next_page: { type: :integer , nullable: true},
    prev_page: { type: :integer, nullable: true },
    total_pages: { type: :integer },
    total_count: { type: :integer }
  },
  required: %w[current_page next_page prev_page total_pages total_count]
}


VERCEL_TOKEN_HEADER_PARAMETER = {
  name: "X-Vercel-OIDC-Token",
  in: :header,
  type: :string,
  required: true,
  description: "Vercel OIDC Token"
}

RSpec.configure do |config|
  # config.include SwaggerHelper
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join("openapi").to_s

  config.openapi_strict_schema_validation = true

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    "v1/openapi.yaml" => {
      openapi: "3.0.1",
      info: {
        title: "Battle Stadium API V1",
        version: "v1"
      },
      paths: {},
      servers: [
        {
          url: "{defaultHost}",
          variables: {
            defaultHost: {
              default: "https://api.battlestadium.gg/api/v1"
            }
          }
        }
      ],
      components: {
        responses: {
          NotFound: {
            description: NOT_FOUND
          }
        },

        securitySchemes: {
          Bearer: {
            description: "JWT key necessary to use API calls",
            type: :apiKey,
            name: "Authorization",
            in: :header
          }
        },

        parameters: {
          Page: PAGE_PARAMETER,
          PerPage: PER_PAGE_PARAMETER,
          VercelTokenHeader: VERCEL_TOKEN_HEADER_PARAMETER
        },

        schemas: {
          Format: FORMAT_SCHEMA,
          Game: GAME_SCHEMA,
          GameDetail: GAME_DETAILS_SCHEMA,
          User: USER_SCHEMA,
          UserDetails: USER_DETAILS_SCHEMA,
          UserMe: USER_ME,
          UserPostRequest: USER_POST_REQUEST,
          UserRequest: USER_REQUEST,
          RegistrationResponse: REGISTRATION_RESPONSE,
          Organization: ORGANIZATION_SCHEMA,
          OrganizationDetails: ORGANIZATION_DETAILS_SCHEMA,
          Tournament: TOURNAMENT_SCHEMA,
          TournamentDetails: TOURNAMENT_DETAILS_SCHEMA,
          Pokemon: POKEMON_SCHEMA,
          PlayerRequest: PLAYER_REQUEST,
          Player: PLAYER_SCHEMA,
          PlayerDetails: PLAYER_DETAILS_SCHEMA,
          Round: ROUND_SCHEMA,
          Phase: PHASE_SCHEMA,
          PhaseDetails: PHASE_DETAILS_SCHEMA,
          GameRequest: GAME_REQUEST,
          TournamentRequest: TOURNAMENT_REQUEST,
          TournamentPostRequest: TOURNAMENT_POST_REQUEST,
          GetSessionRequest: GET_SESSION_REQUEST,
          CreateSession: CREATE_SESSION,
          Session: SESSION,
          SessionAndUser: SESSION_AND_USER,
          Error: ERROR,
          Message: MESSAGE,
          Pagination: PAGINATION_RESPONSE
        }
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
