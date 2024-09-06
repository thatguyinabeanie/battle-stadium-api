/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { Factory } from "rosie";

import {
  DeleteGameRequest,
  GetGameRequest,
  PatchGameRequest,
  Game,
  PostGameRequest,
  DeleteOrganizationRequest,
  GetOrganizationRequest,
  ListOrganizationStaffRequest,
  ListOrganizationTournamentsRequest,
  PatchOrganizationRequest,
  Organization,
  PatchOrganizationTournamentRequest,
  TournamentDetails,
  PostOrganizationRequest,
  PostOrganizationTournamentRequest,
  DeleteTournamentPhaseRequest,
  ListTournamentPhasesRequest,
  PatchTournamentPhaseRequest,
  Phase,
  PostTournamentPhaseRequest,
  ShowTournamentPhaseRequest,
  DeleteTournamentPlayerRequest,
  ListPlayersRequest,
  PostTournamentPlayerRequest,
  PlayerRequest,
  PutTournamentPlayerRequest,
  ShowTournamentPlayerRequest,
  RegisterUserOperationRequest,
  RegisterUserRequest,
  CreateRequest,
  CreateSession,
  GetTournamentRequest,
  AuthorizeUserRequest,
  UserLoginRequest,
  DeleteUserRequest,
  GetUserRequest,
  PatchUserRequest,
  UserDetails,
  PostUserRequest,
  UserPostRequest,
  ChangePasswordRequest,
  Format,
  GameDetail,
  GameRequest,
  GetSessionRequest,
  User,
  OrganizationDetails,
  PasswordRequest,
  PhaseDetails,
  Player,
  Round,
  PlayerDetails,
  Pokemon,
  PostUser403Response,
  RegistrationResponse,
  Session,
  SessionAndUser,
  Tournament,
  TournamentPostRequest,
  TournamentRequest,
  UserLoginResponse,
  UserMe,
  UserRequest,
} from "@/lib/api";

export const DeleteGameRequestFactory = new Factory<DeleteGameRequest>().sequence("id");

export const GetGameRequestFactory = new Factory<GetGameRequest>().sequence("id");

export const PatchGameRequestFactory = new Factory<PatchGameRequest>()

  .sequence("id")
  .attr("game", () => GameFactory.build());

export const PostGameRequestFactory = new Factory<PostGameRequest>().attr("game", () => GameFactory.build());

export const DeleteOrganizationRequestFactory = new Factory<DeleteOrganizationRequest>().sequence("id");

export const GetOrganizationRequestFactory = new Factory<GetOrganizationRequest>().sequence("id");

export const ListOrganizationStaffRequestFactory = new Factory<ListOrganizationStaffRequest>().sequence("id");

export const ListOrganizationTournamentsRequestFactory = new Factory<ListOrganizationTournamentsRequest>().attr(
  "organizationId",
  () => faker.number.int({ min: 1, max: 100 }),
);

export const PatchOrganizationRequestFactory = new Factory<PatchOrganizationRequest>()

  .sequence("id")
  .attr("organization", () => OrganizationFactory.build());

export const PatchOrganizationTournamentRequestFactory = new Factory<PatchOrganizationTournamentRequest>()

  .attr("organizationId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id")
  .attr("tournamentDetails", () => TournamentDetailsFactory.build());

export const PostOrganizationRequestFactory = new Factory<PostOrganizationRequest>().attr("organization", () =>
  OrganizationFactory.build(),
);

export const PostOrganizationTournamentRequestFactory = new Factory<PostOrganizationTournamentRequest>()

  .attr("organizationId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("tournamentDetails", () => TournamentDetailsFactory.build());

export const DeleteTournamentPhaseRequestFactory = new Factory<DeleteTournamentPhaseRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id");

export const ListTournamentPhasesRequestFactory = new Factory<ListTournamentPhasesRequest>().attr("tournamentId", () =>
  faker.number.int({ min: 1, max: 100 }),
);

export const PatchTournamentPhaseRequestFactory = new Factory<PatchTournamentPhaseRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id")
  .attr("phase", () => PhaseFactory.build());

export const PostTournamentPhaseRequestFactory = new Factory<PostTournamentPhaseRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("phase", () => PhaseFactory.build());

export const ShowTournamentPhaseRequestFactory = new Factory<ShowTournamentPhaseRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id");

export const DeleteTournamentPlayerRequestFactory = new Factory<DeleteTournamentPlayerRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id");

export const ListPlayersRequestFactory = new Factory<ListPlayersRequest>().attr("tournamentId", () =>
  faker.number.int({ min: 1, max: 100 }),
);

export const PostTournamentPlayerRequestFactory = new Factory<PostTournamentPlayerRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("playerRequest", () => PlayerRequestFactory.build());

export const PutTournamentPlayerRequestFactory = new Factory<PutTournamentPlayerRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id")
  .attr("playerRequest", () => PlayerRequestFactory.build());

export const ShowTournamentPlayerRequestFactory = new Factory<ShowTournamentPlayerRequest>()

  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .sequence("id");

export const RegisterUserOperationRequestFactory = new Factory<RegisterUserOperationRequest>().attr(
  "registerUserRequest",
  () => RegisterUserRequestFactory.build(),
);

export const CreateRequestFactory = new Factory<CreateRequest>().attr("createSession", () =>
  CreateSessionFactory.build(),
);

export const GetTournamentRequestFactory = new Factory<GetTournamentRequest>().sequence("id");

export const AuthorizeUserRequestFactory = new Factory<AuthorizeUserRequest>().attr("userLoginRequest", () =>
  UserLoginRequestFactory.build(),
);

export const DeleteUserRequestFactory = new Factory<DeleteUserRequest>().sequence("id");

export const GetUserRequestFactory = new Factory<GetUserRequest>().sequence("id");

export const PatchUserRequestFactory = new Factory<PatchUserRequest>()

  .sequence("id")
  .attr("userDetails", () => UserDetailsFactory.build());

export const PostUserRequestFactory = new Factory<PostUserRequest>().attr("userPostRequest", () =>
  UserPostRequestFactory.build(),
);

export const ChangePasswordRequestFactory = new Factory<ChangePasswordRequest>()

  .attr("password", () => faker.internet.password())
  .attr("passwordConfirmation", function (this: any) {
    return this.password;
  })
  .attr("currentPassword", () => faker.lorem.word());

export const CreateSessionFactory = new Factory<CreateSession>()

  .attr("userId", () => faker.lorem.word())
  .attr("sessionToken", () => faker.lorem.word())
  .attr("expiresAt", () => faker.date.recent());

export const FormatFactory = new Factory<Format>().sequence("id").attr("name", () => faker.lorem.word());

export const GameFactory = new Factory<Game>().sequence("id").attr("name", () => faker.lorem.word());

export const GameDetailFactory = new Factory<GameDetail>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("formats", () => FormatFactory.buildList(faker.number.int({ min: 1, max: 5 })));

export const GameRequestFactory = new Factory<GameRequest>().sequence("id").attr("name", () => faker.lorem.word());

export const GetSessionRequestFactory = new Factory<GetSessionRequest>().attr("token", () => faker.lorem.word());

export const OrganizationFactory = new Factory<Organization>()

  .attr("owner", () => UserFactory.build())
  .attr("description", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("logoUrl", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .sequence("id")
  .attr("name", () => faker.lorem.word());

export const OrganizationDetailsFactory = new Factory<OrganizationDetails>()

  .attr("owner", () => UserFactory.build())
  .attr("description", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("logoUrl", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .sequence("id")
  .attr("name", () => faker.lorem.word());

export const PasswordRequestFactory = new Factory<PasswordRequest>()

  .attr("password", () => faker.internet.password())
  .attr("passwordConfirmation", function (this: any) {
    return this.password;
  });

export const PhaseFactory = new Factory<Phase>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("order", () => faker.number.int({ min: 1, max: 100 }))
  .attr("type", () => faker.lorem.word())
  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("numberOfRounds", () => faker.number.int({ min: 1, max: 100 }))
  .attr("bestOf", () => faker.number.int({ min: 1, max: 100 }))
  .attr("startedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("createdAt", () => faker.date.recent())
  .attr("updatedAt", () => faker.date.recent());

export const PhaseDetailsFactory = new Factory<PhaseDetails>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("order", () => faker.number.int({ min: 1, max: 100 }))
  .attr("type", () => faker.lorem.word())
  .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("numberOfRounds", () => faker.number.int({ min: 1, max: 100 }))
  .attr("bestOf", () => faker.number.int({ min: 1, max: 100 }))
  .attr("startedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("createdAt", () => faker.date.recent())
  .attr("updatedAt", () => faker.date.recent())
  .attr("players", () => PlayerFactory.buildList(faker.number.int({ min: 1, max: 5 })))
  .attr("rounds", () => RoundFactory.buildList(faker.number.int({ min: 1, max: 5 })));

export const PlayerFactory = new Factory<Player>()

  .sequence("id")
  .attr("user", () => UserFactory.build())
  .attr("inGameName", () => faker.lorem.word());

export const PlayerDetailsFactory = new Factory<PlayerDetails>()

  .sequence("id")
  .attr("user", () => UserFactory.build())
  .attr("inGameName", () => faker.lorem.word());

export const PlayerRequestFactory = new Factory<PlayerRequest>()

  .attr("userId", () => faker.lorem.word())
  .attr("inGameName", () => faker.lorem.word());

export const PokemonFactory = new Factory<Pokemon>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("nickname", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("ability", () => faker.lorem.word())
  .attr("teraType", () => faker.lorem.word())
  .attr("nature", () => faker.lorem.word())
  .attr("heldItem", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move1", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move2", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move3", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("move4", () => (faker.datatype.boolean() ? faker.lorem.word() : null));

export const PostUser403ResponseFactory = new Factory<PostUser403Response>().attr("error", () => faker.lorem.word());

export const RegisterUserRequestFactory = new Factory<RegisterUserRequest>()

  .attr("username", () => faker.lorem.word())
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("password", () => faker.internet.password())
  .attr("passwordConfirmation", function (this: any) {
    return this.password;
  });

export const RegistrationResponseFactory = new Factory<RegistrationResponse>()

  .sequence("id")
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("username", () => faker.lorem.word())
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .attr("createdAt", () => faker.date.recent())
  .attr("updatedAt", () => faker.date.recent())
  .attr("pronouns", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("jti", () => faker.lorem.word())
  .attr("name", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("emailVerifiedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("image", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("admin", () => faker.datatype.boolean());

export const RoundFactory = new Factory<Round>()

  .sequence("id")
  .attr("phaseId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("roundNumber", () => faker.number.int({ min: 1, max: 100 }))
  .attr("startedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null));

export const SessionFactory = new Factory<Session>()

  .attr("username", () => faker.lorem.word())
  .attr("token", () => faker.lorem.word())
  .attr("userId", () => faker.lorem.word())
  .attr("expiresAt", () => faker.date.recent());

export const SessionAndUserFactory = new Factory<SessionAndUser>()

  .attr("session", () => SessionFactory.build())
  .attr("user", () => UserDetailsFactory.build());

export const TournamentFactory = new Factory<Tournament>()

  .attr("startAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("organization", () => OrganizationFactory.build())
  .attr("format", () => FormatFactory.build())
  .attr("game", () => GameFactory.build())
  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("playerCap", () => (faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null))
  .attr("playerCount", () => faker.number.int({ min: 1, max: 100 }))
  .attr("endAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("startedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationEndAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("lateRegistration", () => faker.datatype.boolean());

export const TournamentDetailsFactory = new Factory<TournamentDetails>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("autostart", () => faker.datatype.boolean())
  .attr("startAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("organization", () => OrganizationFactory.build())
  .attr("format", () => FormatFactory.build())
  .attr("game", () => GameFactory.build())
  .attr("checkInStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("lateRegistration", () => faker.datatype.boolean())
  .attr("teamlistsRequired", () => faker.datatype.boolean())
  .attr("openTeamSheets", () => faker.datatype.boolean())
  .attr("playerCap", () => (faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null))
  .attr("playerCount", () => faker.number.int({ min: 1, max: 100 }))
  .attr("startedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("endedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationEndAt", () => (faker.datatype.boolean() ? faker.date.recent() : null));

export const TournamentPostRequestFactory = new Factory<TournamentPostRequest>()

  .attr("organizationId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("name", () => faker.lorem.word())
  .attr("gameId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("formatId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("autostart", () => faker.datatype.boolean())
  .attr("startAt", () => faker.date.recent())
  .attr("playerCap", () => (faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null))
  .attr("registrationStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationEndAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("lateRegistration", () => faker.datatype.boolean())
  .attr("checkInStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("openTeamSheets", () => faker.datatype.boolean())
  .attr("teamlistsRequired", () => faker.datatype.boolean());

export const TournamentRequestFactory = new Factory<TournamentRequest>()

  .sequence("id")
  .attr("name", () => faker.lorem.word())
  .attr("gameId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("formatId", () => faker.number.int({ min: 1, max: 100 }))
  .attr("autostart", () => faker.datatype.boolean())
  .attr("startAt", () => faker.date.recent())
  .attr("playerCap", () => (faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null))
  .attr("registrationStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("registrationEndAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("lateRegistration", () => faker.datatype.boolean())
  .attr("checkInStartAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("openTeamSheets", () => faker.datatype.boolean())
  .attr("teamlistsRequired", () => faker.datatype.boolean());

export const UserFactory = new Factory<User>()

  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .sequence("id");

export const UserDetailsFactory = new Factory<UserDetails>()

  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .sequence("id")
  .attr("emailVerifiedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null));

export const UserLoginRequestFactory = new Factory<UserLoginRequest>()

  .attr("username", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("email", () => (faker.datatype.boolean() ? faker.lorem.word() : null))
  .attr("password", () => faker.internet.password());

export const UserLoginResponseFactory = new Factory<UserLoginResponse>()

  .sequence("id")
  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .attr("token", () => faker.lorem.word())
  .attr("emailVerifiedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null));

export const UserMeFactory = new Factory<UserMe>()

  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .sequence("id")
  .attr("emailVerifiedAt", () => (faker.datatype.boolean() ? faker.date.recent() : null))
  .attr("organizations", () => OrganizationFactory.buildList(faker.number.int({ min: 1, max: 5 })));

export const UserPostRequestFactory = new Factory<UserPostRequest>()

  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .attr("password", () => faker.internet.password())
  .attr("passwordConfirmation", function (this: any) {
    return this.password;
  })
  .sequence("id");

export const UserRequestFactory = new Factory<UserRequest>()

  .attr("username", () => faker.lorem.word())
  .attr("pronouns", () => faker.lorem.word())
  .attr("email", () => `${faker.internet.userName()}@example.com`)
  .attr("firstName", () => faker.lorem.word())
  .attr("lastName", () => faker.lorem.word())
  .attr("currentPassword", () => faker.lorem.word())
  .sequence("id");
