import * as jose from "jose";

import {
  UsersApi,
  GamesApi,
  PhasesApi,
  TournamentsApi,
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
  OrganizationsApi,
} from "@/lib/api/apis";
import { auth } from "@/auth";
import { Configuration, ConfigurationParameters, HTTPHeaders, InitOverrideFunction } from "./api/runtime";
import { UserDetails } from "./api/models";

const defaultConfig = async () => {
  const session = await auth();
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const jwt = await new jose.SignJWT({ user: session?.user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("8h")
    .sign(secret);

  const headers: HTTPHeaders = session
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

const Session = (configOverride?: Configuration) => {
  const SessionAPI = async () => new SessionsApi( configOverride ?? await defaultConfig());
  return {
    create: async (requestParameters?: LoginUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).loginUser(requestParameters, initOverrides),
    get: async (initOverrides?: RequestInit | InitOverrideFunction) => (await SessionAPI()).getSession(initOverrides),
    update: async (initOverrides?: RequestInit | InitOverrideFunction) => Promise.resolve({}) as any,
    delete: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).logoutUser(initOverrides),
  };
};


const Registration = (configOverride?: Configuration) => {
  const RegistrationAPI = async () => new RegistrationApi(configOverride ?? await defaultConfig());

  return {
    register: async (
      requestParameters?: RegisterUserOperationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => (await RegistrationAPI()).registerUser(requestParameters, initOverrides),
  };
};

const Organizations = (configOverride?: Configuration) => {
  const OrganizationsAPI = async () => new OrganizationsApi(configOverride ?? await defaultConfig());

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

const Users = (configOverride?: Configuration) => {
  const UsersAPI = async () => new UsersApi(configOverride ?? await defaultConfig());

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).listUsers(initOverrides),

    post: async (requestParameters?: PostUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).postUser(requestParameters, initOverrides),

    get: async (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getUser(requestParameters, initOverrides),

    getByEmail: (email: string, initOverrides?: RequestInit | InitOverrideFunction): Promise<UserDetails> => Promise.resolve({} as UserDetails),

    linkAccount: async (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) => Promise.resolve({} as UserDetails),

    unlinkAccount: async (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) => Promise.resolve({} as UserDetails),

    getUserByProvider: async (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) => Promise.resolve({} as UserDetails),

    patch: async (requestParameters: PatchUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).patchUser(requestParameters, initOverrides),

    delete: async (requestParameters: DeleteUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).deleteUser(requestParameters, initOverrides),

    me: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).getMe(initOverrides),
  };
};

const Games = (configOverride?: Configuration) => {
  const GamesAPI = async () => new GamesApi(configOverride ?? await defaultConfig());

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

const Tournaments = (configOverride?: Configuration) => {
  const PhasesAPI = async () => new PhasesApi(configOverride ?? await defaultConfig());
  const TournamentsAPI = async () => new TournamentsApi(configOverride ?? await defaultConfig());

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

const BattleStadiumAPI = (configOverride?: Configuration) => ({
  Session: Session(configOverride),
  Registration: Registration(configOverride),
  Organizations: Organizations(configOverride),
  Users: Users(configOverride),
  Games: Games(configOverride),
  Tournaments: Tournaments(configOverride),
});

export type BattleStadiumAPIClient = ReturnType<typeof BattleStadiumAPI>;

export { BattleStadiumAPI };
export default BattleStadiumAPI;
