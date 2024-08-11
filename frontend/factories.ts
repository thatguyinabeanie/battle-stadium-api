import { faker } from "@faker-js/faker";
import { Factory } from "rosie";

import {
  ChangePasswordRequest,
  Format,
  Game,
  GameDetail,
  GameRequest,
  Organization,
  OrganizationDetails,
  PasswordRequest,
  Phase,
  PhaseDetails,
  Player,
  PlayerDetails,
  PlayerRequest,
  Pokemon,
  Round,
  Tournament,
  TournamentDetails,
  TournamentPostRequest,
  TournamentRequest,
  User,
  UserDetails,
  UserLoginRequest,
  UserPostRequest,
  UserRequest,
  GamesApiDeleteGameRequest,
  GamesApiGetGameRequest,
  GamesApiPatchGameRequest,
  GamesApiPostGameRequest,
  OrganizationsApiDeleteOrganizationRequest,
  OrganizationsApiGetOrganizationRequest,
  OrganizationsApiListOrganizationStaffRequest,
  OrganizationsApiPatchOrganizationRequest,
  OrganizationsApiPatchOrganizationTournamentRequest,
  OrganizationsApiPostOrganizationRequest,
  OrganizationsApiPostOrganizationTournamentRequest,
  PhasesApiDeleteTournamentPhaseRequest,
  PhasesApiListTournamentPhasesRequest,
  PhasesApiPostTournamentPhaseRequest,
  PhasesApiPutTournamentPhaseRequest,
  PhasesApiShowTournamentPhaseRequest,
  PlayersApiDeleteTournamentPlayerRequest,
  PlayersApiListPlayersRequest,
  PlayersApiPostTournamentPlayerRequest,
  PlayersApiPutTournamentPlayerRequest,
  PlayersApiShowTournamentPlayerRequest,
  SessionsApiLoginUserRequest,
  TournamentsApiGetTournamentRequest,
  UsersApiDeleteUserRequest,
  UsersApiGetUserRequest,
  UsersApiPatchUserRequest,
  UsersApiPostUserRequest,
} from "./api";

export const ChangePasswordRequestFactory = new Factory<ChangePasswordRequest>()
  .attr("password", () => faker.lorem.word())
  .attr("password_confirmation", () => faker.date.recent().toISOString())
  .attr("current_password", () => faker.lorem.word());
export const FormatFactory = new Factory<Format>()
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const GameFactory = new Factory<Game>()
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const GameDetailFactory = new Factory<GameDetail>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("formats", ["id"], (id) =>
    FormatFactory.buildList(faker.number.int({ min: 1, max: 5 }), { id }),
  );
export const GameRequestFactory = new Factory<GameRequest>()
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const OrganizationFactory = new Factory<Organization>()
  .attr("owner", () => UserFactory.build())
  .attr("description", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const OrganizationDetailsFactory = new Factory<OrganizationDetails>()
  .attr("owner", () => UserFactory.build())
  .attr("description", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const PasswordRequestFactory = new Factory<PasswordRequest>()
  .attr("password", () => faker.lorem.word())
  .attr("password_confirmation", () => faker.date.recent().toISOString());
export const PhaseFactory = new Factory<Phase>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("order", () => faker.number.int({ min: 1, max: 100 }))
  .attr("type", () => faker.lorem.word())
  .attr("tournament_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("number_of_rounds", () => faker.number.int({ min: 1, max: 100 }))
  .attr("best_of", () => faker.number.int({ min: 1, max: 100 }))
  .attr("criteria", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("started_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("ended_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("created_at", () => faker.date.recent().toISOString())
  .attr("updated_at", () => faker.date.recent().toISOString());
export const PhaseDetailsFactory = new Factory<PhaseDetails>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("order", () => faker.number.int({ min: 1, max: 100 }))
  .attr("type", () => faker.lorem.word())
  .attr("tournament_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("number_of_rounds", () => faker.number.int({ min: 1, max: 100 }))
  .attr("best_of", () => faker.number.int({ min: 1, max: 100 }))
  .attr("criteria", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("started_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("ended_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("created_at", () => faker.date.recent().toISOString())
  .attr("updated_at", () => faker.date.recent().toISOString())
  .attr("players", ["id"], (id) =>
    PlayerFactory.buildList(faker.number.int({ min: 1, max: 5 }), { id }),
  )
  .attr("rounds", ["id"], (id) =>
    RoundFactory.buildList(faker.number.int({ min: 1, max: 5 }), { id }),
  );
export const PlayerFactory = new Factory<Player>()
  .sequence("id")
  .attr("user", () => UserFactory.build())
  .attr("in_game_name", () => faker.lorem.word());
export const PlayerDetailsFactory = new Factory<PlayerDetails>()
  .sequence("id")
  .attr("user", () => UserFactory.build())
  .attr("in_game_name", () => faker.lorem.word());
export const PlayerRequestFactory = new Factory<PlayerRequest>()
  .attr("user_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("in_game_name", () => faker.lorem.word());
export const PokemonFactory = new Factory<Pokemon>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("nickname", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("ability", () => faker.lorem.word())
  .attr("tera_type", () => faker.lorem.word())
  .attr("nature", () => faker.date.recent().toISOString())
  .attr("held_item", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("move1", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move2", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move3", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move4", () => (faker.datatype.boolean() ? faker.lorem.word() : null));
export const RoundFactory = new Factory<Round>()
  .sequence("id")
  .attr("phase_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("round_number", () => faker.number.int({ min: 1, max: 100 }))
  .attr("started_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("ended_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  );
export const TournamentFactory = new Factory<Tournament>()
  .attr("start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("organization", () => OrganizationFactory.build())
  .attr("format", () => FormatFactory.build())
  .attr("game", () => GameFactory.build())
  .sequence("id")
  .attr("name", () => faker.lorem.word());
export const TournamentDetailsFactory = new Factory<TournamentDetails>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("player_cap", () =>
    faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null,
  )
  .attr("player_count", () => faker.number.int({ min: 1, max: 100 }))
  .attr("end_at", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("started_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("ended_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("registration_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("registration_end_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("late_registration", () => faker.datatype.boolean())
  .attr("autostart", () => faker.datatype.boolean())
  .attr("start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("organization", () => OrganizationFactory.build())
  .attr("format", () => FormatFactory.build())
  .attr("game", () => GameFactory.build())
  .attr("check_in_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("teamlists_required", () => faker.datatype.boolean())
  .attr("open_team_sheets", () => faker.datatype.boolean());
export const TournamentPostRequestFactory = new Factory<TournamentPostRequest>()
  .attr("organization_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("name", () => faker.lorem.word())
  .attr("game_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("format_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("autostart", () => faker.datatype.boolean())
  .attr("start_at", () => faker.date.recent().toISOString())
  .attr("player_cap", () =>
    faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null,
  )
  .attr("registration_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("registration_end_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("late_registration", () => faker.datatype.boolean())
  .attr("check_in_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("open_team_sheets", () => faker.datatype.boolean())
  .attr("teamlists_required", () => faker.datatype.boolean());
export const TournamentRequestFactory = new Factory<TournamentRequest>()
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("game_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("format_id", () => faker.number.int({ min: 1, max: 100 }))
  .attr("autostart", () => faker.datatype.boolean())
  .attr("start_at", () => faker.date.recent().toISOString())
  .attr("player_cap", () =>
    faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null,
  )
  .attr("registration_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("registration_end_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("late_registration", () => faker.datatype.boolean())
  .attr("check_in_start_at", () =>
    faker.datatype.boolean() ? faker.lorem.word() : null,
  )
  .attr("open_team_sheets", () => faker.datatype.boolean())
  .attr("teamlists_required", () => faker.datatype.boolean());
export const UserFactory = new Factory<User>()
  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .sequence("id");
export const UserDetailsFactory = new Factory<UserDetails>()
  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("first_name", () => faker.lorem.word())
  .attr("last_name", () => faker.lorem.word())
  .sequence("id");
export const UserLoginRequestFactory = new Factory<UserLoginRequest>()
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("password", () => faker.lorem.word());
export const UserPostRequestFactory = new Factory<UserPostRequest>()
  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("first_name", () => faker.lorem.word())
  .attr("last_name", () => faker.lorem.word())
  .attr("password", () => faker.lorem.word())
  .attr("password_confirmation", () => faker.date.recent().toISOString())
  .sequence("id");
export const UserRequestFactory = new Factory<UserRequest>()
  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("first_name", () => faker.lorem.word())
  .attr("last_name", () => faker.lorem.word())
  .attr("current_password", () => faker.lorem.word())
  .sequence("id");
export const GamesApiDeleteGameRequestFactory =
  new Factory<GamesApiDeleteGameRequest>().sequence("id");
export const GamesApiGetGameRequestFactory =
  new Factory<GamesApiGetGameRequest>().sequence("id");
export const GamesApiPatchGameRequestFactory =
  new Factory<GamesApiPatchGameRequest>()
    .sequence("id")
    .attr("game", () => GameFactory.build());
export const GamesApiPostGameRequestFactory =
  new Factory<GamesApiPostGameRequest>().attr("game", () =>
    GameFactory.build(),
  );
export const OrganizationsApiDeleteOrganizationRequestFactory =
  new Factory<OrganizationsApiDeleteOrganizationRequest>().sequence("id");
export const OrganizationsApiGetOrganizationRequestFactory =
  new Factory<OrganizationsApiGetOrganizationRequest>().sequence("id");
export const OrganizationsApiListOrganizationStaffRequestFactory =
  new Factory<OrganizationsApiListOrganizationStaffRequest>().sequence("id");
export const OrganizationsApiPatchOrganizationRequestFactory =
  new Factory<OrganizationsApiPatchOrganizationRequest>()
    .sequence("id")
    .attr("organization", () => OrganizationFactory.build());
export const OrganizationsApiPatchOrganizationTournamentRequestFactory =
  new Factory<OrganizationsApiPatchOrganizationTournamentRequest>()
    .sequence("id")
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("tournamentDetails", () => TournamentDetailsFactory.build());
export const OrganizationsApiPostOrganizationRequestFactory =
  new Factory<OrganizationsApiPostOrganizationRequest>().attr(
    "organization",
    () => OrganizationFactory.build(),
  );
export const OrganizationsApiPostOrganizationTournamentRequestFactory =
  new Factory<OrganizationsApiPostOrganizationTournamentRequest>()
    .sequence("id")
    .attr("tournamentDetails", () => TournamentDetailsFactory.build());
export const PhasesApiDeleteTournamentPhaseRequestFactory =
  new Factory<PhasesApiDeleteTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");
export const PhasesApiListTournamentPhasesRequestFactory =
  new Factory<PhasesApiListTournamentPhasesRequest>().attr("tournamentId", () =>
    faker.number.int({ min: 1, max: 100 }),
  );
export const PhasesApiPostTournamentPhaseRequestFactory =
  new Factory<PhasesApiPostTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("phase", () => PhaseFactory.build());
export const PhasesApiPutTournamentPhaseRequestFactory =
  new Factory<PhasesApiPutTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id")
    .attr("phase", () => PhaseFactory.build());
export const PhasesApiShowTournamentPhaseRequestFactory =
  new Factory<PhasesApiShowTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");
export const PlayersApiDeleteTournamentPlayerRequestFactory =
  new Factory<PlayersApiDeleteTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");
export const PlayersApiListPlayersRequestFactory =
  new Factory<PlayersApiListPlayersRequest>().attr("tournamentId", () =>
    faker.number.int({ min: 1, max: 100 }),
  );
export const PlayersApiPostTournamentPlayerRequestFactory =
  new Factory<PlayersApiPostTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("playerRequest", () => PlayerRequestFactory.build());
export const PlayersApiPutTournamentPlayerRequestFactory =
  new Factory<PlayersApiPutTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id")
    .attr("playerRequest", () => PlayerRequestFactory.build());
export const PlayersApiShowTournamentPlayerRequestFactory =
  new Factory<PlayersApiShowTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");
export const SessionsApiLoginUserRequestFactory =
  new Factory<SessionsApiLoginUserRequest>().attr("userLoginRequest", () =>
    UserLoginRequestFactory.build(),
  );
export const TournamentsApiGetTournamentRequestFactory =
  new Factory<TournamentsApiGetTournamentRequest>().sequence("id");
export const UsersApiDeleteUserRequestFactory =
  new Factory<UsersApiDeleteUserRequest>().sequence("id");
export const UsersApiGetUserRequestFactory =
  new Factory<UsersApiGetUserRequest>().sequence("id");
export const UsersApiPatchUserRequestFactory =
  new Factory<UsersApiPatchUserRequest>()
    .sequence("id")
    .attr("userDetails", () => UserDetailsFactory.build());
export const UsersApiPostUserRequestFactory =
  new Factory<UsersApiPostUserRequest>().attr("userPostRequest", () =>
    UserPostRequestFactory.build(),
  );
