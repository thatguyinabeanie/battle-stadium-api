# frozen_string_literal: true

require "rails_helper"
require "support/constants"
ID_TYPE = { type: :integer, format: :int64 }.freeze
ID_PROPERTY = { id: { type: :integer, format: :int64 } }.freeze
NAME_PROPERTY = { name: { type: :string } }.freeze
ID_NAME_REQUIRED = %w[id name].freeze

COMPONENT_SCHEMA_ORGANIZATION = "#/components/schemas/Organization"
COMPONENT_SCHEMA_FORMAT = "#/components/schemas/Format"
COMPONENT_SCHEMA_GAME = "#/components/schemas/Game"

ID_NAME_PROPERTIES = {
  id: ID_PROPERTY[:id],
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

SIMPLE_ACCOUNT_SCHEMA = {
  type: :object,
  title: "Simple Account",
  properties: {
    username: { type: :string },
    pronouns: { type: :string },
    image_url: { type: :string, nullable: true }
  },
  required: %w[username pronouns]
}.freeze

PROFILE_SCHEMA = {
  type: :object,
  title: "Profile",
  properties: {
    id: ID_TYPE,
    default: { type: :boolean },
    username: { type: :string },
    image_url: { type: :string, nullable: true },
    pronouns: { type: :string , nullable: true }
  },
  required: %w[username image_url id pronouns default]
}.freeze

POST_PROFILE_SCHEMA = {
  type: :object,
  title: "Post Profile",
  properties: {
    username: { type: :string },
    image_url: { type: :string, nullable: true },
    pronouns: { type: :string , nullable: true }
  },
  required: %w[username]
}

ACCOUNT_SCHEMA = SIMPLE_ACCOUNT_SCHEMA.deep_merge(
  {
    title: "account",
    properties: ID_PROPERTY,
    required: %w[username pronouns id] + SIMPLE_ACCOUNT_SCHEMA[:required]
  }
).freeze

SIMPLE_ACCOUNT_DETAILS_SCHEMA = SIMPLE_ACCOUNT_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Simple Account Details",
    properties: {
      email: { type: :string },
      first_name: { type: :string },
      last_name: { type: :string },
      image_url: { type: :string, nullable: true }
    },
    required: %w[email first_name last_name ] + SIMPLE_ACCOUNT_SCHEMA[:required]
  }
).freeze

ACCOUNT_DETAILS_SCHEMA = SIMPLE_ACCOUNT_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Account Details",
    properties: ID_PROPERTY,
    required: %w[id] + SIMPLE_ACCOUNT_DETAILS_SCHEMA[:required]
  }
).freeze

ACCOUNT_ME = ACCOUNT_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Account Me",
    properties: {
      organizations: { type: :array, items: { "$ref" => COMPONENT_SCHEMA_ORGANIZATION } },
      admin: { type: :boolean }
    },
    required: %w[organizations admin] + ACCOUNT_DETAILS_SCHEMA[:required]
  }
).freeze

ACCOUNT_REQUEST = SIMPLE_ACCOUNT_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Account Request",
    properties: ID_PROPERTY,
    required: SIMPLE_ACCOUNT_DETAILS_SCHEMA[:required]
  }
).freeze

ACCOUNT_POST_REQUEST = SIMPLE_ACCOUNT_DETAILS_SCHEMA.deep_merge(
  {
    type: :object,
    title: "Account Request",
    properties: ID_PROPERTY,
    required: SIMPLE_ACCOUNT_DETAILS_SCHEMA[:required]
  }
).freeze

ACCOUNT_LOGIN_RESPONSE = {
  type: :object,
  title: "Account Login Response",
  properties: ID_PROPERTY.merge(
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
  properties: ID_PROPERTY.merge(
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
    owner: { "$ref" => "#/components/schemas/Account" , :nullable => true},
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
  late_registration: { type: :boolean },
  published: { type: :boolean }
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
  required: ID_NAME_REQUIRED + %w[player_cap organization format game start_at player_count published registration_start_at registration_end_at late_registration]
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
      open_team_sheets: { type: :boolean },
      phases: { type: :array, items: { "$ref" => "#/components/schemas/Phase" } },
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
  properties: {
    position: { type: :integer, format: :integer },
    species: { type: :string },
    nickname: { type: :string, nullable: true },
    gender: { type: :string },
    ability: { type: :string },
    tera_type: { type: :string },
    nature: { type: :string },
    form: { type: :string, nullable: true },
    item: { type: :string, nullable: true },
    move1: { type: :string, nullable: true },
    move2: { type: :string, nullable: true },
    move3: { type: :string, nullable: true },
    move4: { type: :string, nullable: true },
    pokemon_team_id: { type: :integer, format: :int64 }
  },
  required:  %w[species ability tera_type nature form item move1 move2 move3 move4]
}.freeze

POKEMON_TEAM_SCHEMA = {
  type: :object,
  title: "Pokemon Team",
  properties: ID_NAME_PROPERTIES.merge(
    pokepaste_id: { type: :string, nullable: true },
    profile: { "$ref" => "#/components/schemas/Profile" },
    public: { type: :boolean },
    archived_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    format: { "$ref" => "#/components/schemas/Format" },
    game: { "$ref" => "#/components/schemas/Game" },
    pokemon: { type: :array, items: { "$ref" => "#/components/schemas/Pokemon" } }
  ),
  required: ID_NAME_REQUIRED + %w[profile public archived_at format game pokemon]
}.freeze


PLAYER_REQUEST = {
  type: :object,
  title: "Player Request",
  properties: {
    account_id: ID_TYPE,
    in_game_name: { type: :string }
  },
  required: %w[account_id in_game_name]
}.freeze

PLAYER_SCHEMA = {
  type: :object,
  title: "Player",
  properties: {
    id: { type: :integer, format: :int64 },
    profile: { "$ref" => "#/components/schemas/Profile" },
    in_game_name: { type: :string }
    # checked_in: { type: :boolean },
    # checked_in_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    # team_sheet_submitted: { type: :boolean },
    # team_sheet_submitted_at: { type: :string, format: DATE_TIME_TYPE, nullable: true }
  },
  # required: %w[id in_game_name checked_in checked_in_at team_sheet_submitted team_sheet_submitted_at]
  required: %w[id profile in_game_name]
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

MATCH_SCHEMA  = {
  type: :object,
  title: "Match",
  properties: {
    id: { type: :integer, format: :int64 },
    round_id: { type: :integer, format: :int64 },
    tournament_id: { type: :integer, format: :int64 },
    table_number: { type: :integer, format: :int64 },
    player_one: {type: :string},
    player_two: {type: :string},
    reset_by: {type: :string, nullable: true}
  },
  required: %w[id round_id table_number player_one player_two reset_by]
}.freeze

MATCH_GAME_SCHEMA = {
  type: :object,
  title: "Match Game",
  properties: {
    id: { type: :integer, format: :int64 },
    match_id: { type: :integer, format: :int64 },
    game_number: { type: :integer, format: :int64 },
    player_one: {type: :string},
    player_two: {type: :string},
    loser: {type: :string, nullable: true},
    winner: {type: :string, nullable: true},
    reporter: {type: :string},
    ended_at: { type: :string, format: DATE_TIME_TYPE, nullable: true },
    started_at: { type: :string, format: DATE_TIME_TYPE, nullable: true }
  },
  required: %w[id match_id game_number player_one player_two reporter, ended_at started_at]
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
  required: false,
  description: "Vercel OIDC Token"
}

POKEMON_TEAM_PARAMETER = {
  name: "pokemon_team",
  in: :body,
  type: :object,
  schema: {
    type: :object,
    title: "pokemon_team",
    properties: {
      pokepaste_id: { type: :string, nullable: true },
      profile_id: { type: :integer, format: :int64 , nullable: true},
      name: { type: :string },
      game_id: { type: :integer, format: :int64 },
      format_id: { type: :integer, format: :int64 },
      pokemon: { type: :array, items: { "$ref" => "#/components/schemas/Pokemon" } }
    },
    required: %w[profile_id: name game_id format_id pokemon],
  }, required: true
}

PROFILE_PARAMETER = {
  name: "profile",
  in: :body,
  type: :object,
  schema: {
    type: :object,
    title: "profile",
    properties: {
      username: { type: :string },
      image_url: { type: :string, nullable: true },
      pronouns: { type: :string , nullable: true }
    },
    required: %w[username]
  }, required: true
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
          url: ENV["RAILS_API_DEFAULT_HOST"],
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
          VercelTokenHeader: VERCEL_TOKEN_HEADER_PARAMETER,
          PokemonTeam: POKEMON_TEAM_PARAMETER,
          Profile: PROFILE_PARAMETER
        },

        schemas: {
          Format: FORMAT_SCHEMA,
          Game: GAME_SCHEMA,
          GameDetail: GAME_DETAILS_SCHEMA,
          Account: ACCOUNT_SCHEMA,
          AccountDetails: ACCOUNT_DETAILS_SCHEMA,
          AccountMe: ACCOUNT_ME,
          AccountPostRequest: ACCOUNT_POST_REQUEST,
          AccountRequest: ACCOUNT_REQUEST,
          RegistrationResponse: REGISTRATION_RESPONSE,
          Organization: ORGANIZATION_SCHEMA,
          Tournament: TOURNAMENT_SCHEMA,
          TournamentDetails: TOURNAMENT_DETAILS_SCHEMA,
          Pokemon: POKEMON_SCHEMA,
          PokemonTeam: POKEMON_TEAM_SCHEMA,
          PlayerRequest: PLAYER_REQUEST,
          Player: PLAYER_SCHEMA,
          PlayerDetails: PLAYER_DETAILS_SCHEMA,
          Round: ROUND_SCHEMA,
          Phase: PHASE_SCHEMA,
          PhaseDetails: PHASE_DETAILS_SCHEMA,
          GameRequest: GAME_REQUEST,
          TournamentRequest: TOURNAMENT_REQUEST,
          TournamentPostRequest: TOURNAMENT_POST_REQUEST,
          Error: ERROR,
          Message: MESSAGE,
          Pagination: PAGINATION_RESPONSE,
          Profile: PROFILE_SCHEMA,
          PostProfile: POST_PROFILE_SCHEMA,
          Match: MATCH_SCHEMA
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
