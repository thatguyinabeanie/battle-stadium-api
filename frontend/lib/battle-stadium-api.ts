import * as jose from "jose";

import { auth } from "@/auth";
import {
  OrganizationsApi,
  UsersApi,
  GamesApi,
  PhasesApi,
  TournamentsApi,
  InitOverrideFunction,
  PostOrganizationTournamentRequest,
  PatchOrganizationTournamentRequest,
  ListOrganizationStaffRequest,
  PostUserRequest,
  GetUserRequest,
  PatchUserRequest,
  DeleteUserRequest,
  PostOrganizationRequest,
  PostGameRequest,
  GetGameRequest,
  PatchGameRequest,
  DeleteGameRequest,
  GetTournamentRequest,
  PostTournamentPhaseRequest,
  PatchTournamentPhaseRequest,
  ListTournamentPhasesRequest,
  GetOrganizationRequest,
  DeleteOrganizationRequest,
  PatchOrganizationRequest,
  SessionsApi,
  LoginUserRequest,
  RegistrationApi,
  RegisterUserOperationRequest,
  Configuration,
  ConfigurationParameters,
  HTTPHeaders,
} from "@/lib/api";

const config = async () => {
  const getCorrectSession = async () => {
    return await auth();
  };

  const session = await getCorrectSession();

  // TODO: move this out of here
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const jwt = await new jose.SignJWT({ user: session?.user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("8h")
    .sign(secret);

  const headers: HTTPHeaders = (await getCorrectSession())
    ? {
        Authorization: `Bearer ${jwt}`,
      }
    : {};

  const params: ConfigurationParameters = {
    accessToken: async () => {
      // @ts-expect-error TODO: fix session type
      return session?.accessToken ?? "";
    },
    headers,
  };

  return new Configuration(params);
};

const Authentication = () => {
  const SessionAPI = async () => new SessionsApi(await config());
  const RegistrationAPI = async () => new RegistrationApi(await config());

  return {
    login: async (requestParameters?: LoginUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).loginUser(requestParameters, initOverrides),

    logout: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).logoutUser(initOverrides),

    register: async (
      requestParameters?: RegisterUserOperationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => (await RegistrationAPI()).registerUser(requestParameters, initOverrides),
  };
};

const Organizations = () => {
  const OrganizationsAPI = async () => new OrganizationsApi(await config());

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).listOrganizations(initOverrides),

    post: async (requestParameters: PostOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).postOrganization(requestParameters, initOverrides),

    get: async (requestParameters: GetOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).getOrganization(requestParameters, initOverrides),

    patch: async (requestParameters: PatchOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).patchOrganization(requestParameters, initOverrides),

    delete: async (requestParameters: DeleteOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).deleteOrganization(requestParameters, initOverrides),

    Tournaments: {
      post: async (
        requestParameters: PostOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => (await OrganizationsAPI()).postOrganizationTournament(requestParameters, initOverrides),

      patch: async (
        requestParameters: PatchOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => (await OrganizationsAPI()).patchOrganizationTournament(requestParameters, initOverrides),
    },

    Staff: {
      list: async (
        requestParameters: ListOrganizationStaffRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => (await OrganizationsAPI()).listOrganizationStaff(requestParameters, initOverrides),
    },
  };
};

const Users = () => {
  const UsersAPI = async () => new UsersApi(await config());

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).listUsers(initOverrides),

    post: async (requestParameters?: PostUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).postUser(requestParameters, initOverrides),

    get: async (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getUser(requestParameters, initOverrides),

    patch: async (requestParameters: PatchUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).patchUser(requestParameters, initOverrides),

    delete: async (requestParameters: DeleteUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).deleteUser(requestParameters, initOverrides),

    me: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).getMe(initOverrides),
  };
};

const Games = () => {
  const GamesAPI = async () => new GamesApi(await config());

  return {
    listGames: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).listGames(initOverrides),
    postGame: async (requestParameters?: PostGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).postGame(requestParameters, initOverrides),

    getGame: async (requestParameters: GetGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).getGame(requestParameters, initOverrides),

    patchGame: async (requestParameters: PatchGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).patchGame(requestParameters, initOverrides),

    deleteGame: async (requestParameters: DeleteGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).deleteGame(requestParameters, initOverrides),
  };
};

const Tournaments = () => {
  const PhasesAPI = async () => new PhasesApi(await config());
  const TournamentsAPI = async () => new TournamentsApi(await config());

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).listTournaments(initOverrides),

    get: async (requestParameters: GetTournamentRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).getTournament(requestParameters, initOverrides),

    post: async (requestParameters: PostTournamentPhaseRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await PhasesAPI()).postTournamentPhase(requestParameters, initOverrides),

    patch: async (requestParameters: PatchTournamentPhaseRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await PhasesAPI()).patchTournamentPhase(requestParameters, initOverrides),

    Phases: {
      list: async (
        requestParameters: ListTournamentPhasesRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => (await PhasesAPI()).listTournamentPhases(requestParameters, initOverrides),
    },
  };
};

const BattleStadiumAPI = {
  Authentication: Authentication(),
  Organizations: Organizations(),
  Users: Users(),
  Games: Games(),
  Tournaments: Tournaments(),
};

export { BattleStadiumAPI };
export default BattleStadiumAPI;
