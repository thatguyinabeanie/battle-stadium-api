import * as jose from "jose";
import { JWT } from "@auth/core/jwt";

import { Configuration, ConfigurationParameters, HTTPHeaders, InitOverrideFunction } from "./api/runtime";
import {
  CreateSession,
  Game,
  Organization,
  Phase,
  RegisterUserRequest,
  TournamentDetails,
  UserDetails,
  UserLoginRequest,
  UserPostRequest,
} from "./api/models";

import {
  UsersApi,
  GamesApi,
  PhasesApi,
  TournamentsApi,
  GetUserRequest,
  SessionsApi,
  RegistrationApi,
  OrganizationsApi,
} from "@/lib/api/apis";
import { auth } from "@/auth";

export const jwt = async (payload: JWT, encryptionSecret: string | undefined = process.env.AUTH_SECRET) => {
  const secret = encryptionSecret ?? process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("No secret provided");
  }

  const encoder = new TextEncoder();

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("5m")
    .sign(encoder.encode(secret));
};

export const config = (encryptedJwt: string) =>
  new Configuration({
    headers: {
      Authorization: `Bearer ${encryptedJwt}`,
    },
  });

const defaultConfig = async () => {
  const session = await auth();

  const headers: HTTPHeaders = session
    ? {
        Authorization: `Bearer ${await jwt({
          session: session,
        })}`,
      }
    : {};

  const params: ConfigurationParameters = {
    accessToken: async () => {
      return session?.accessToken ?? "";
    },
    headers,
  };

  return new Configuration(params);
};

const Session = (configOverride?: Configuration) => {
  const SessionAPI = async () => new SessionsApi(configOverride ?? (await defaultConfig()));

  return {
    create: async (requestParameters?: CreateSession, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).create(requestParameters, initOverrides),
    get: async (initOverrides?: RequestInit | InitOverrideFunction) => (await SessionAPI()).getSession(initOverrides),
    update: async (initOverrides?: RequestInit | InitOverrideFunction) => (await SessionAPI()).update(initOverrides),
    delete: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await SessionAPI()).logoutUser(initOverrides),
  };
};

const Registration = (configOverride?: Configuration) => {
  const RegistrationAPI = async () => new RegistrationApi(configOverride ?? (await defaultConfig()));

  return {
    register: async (requestParameters?: RegisterUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await RegistrationAPI()).registerUser(requestParameters, initOverrides),
  };
};

const Organizations = (configOverride?: Configuration) => {
  const OrganizationsAPI = async () => new OrganizationsApi(configOverride ?? (await defaultConfig()));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).listOrganizations(initOverrides),

    post: async (requestParameters: Organization, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).postOrganization(requestParameters, initOverrides),

    get: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).getOrganization(organizationId, initOverrides),

    patch: async (
      organizationId: number,
      organization?: Organization,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => (await OrganizationsAPI()).patchOrganization(organizationId, organization, initOverrides),

    delete: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).deleteOrganization(organizationId, initOverrides),

    Tournaments: {
      post: async (
        organizationId: number,
        tournamentDetails?: TournamentDetails,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => (await OrganizationsAPI()).postOrganizationTournament(organizationId, tournamentDetails, initOverrides),

      patch: async (
        organizationId: number,
        tournamentId: number,
        tournamentDetails?: TournamentDetails,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) =>
        (await OrganizationsAPI()).patchOrganizationTournament(
          organizationId,
          tournamentId,
          tournamentDetails,
          initOverrides,
        ),
    },

    Staff: {
      list: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await OrganizationsAPI()).listOrganizationStaff(organizationId, initOverrides),
    },
  };
};

const Users = (configOverride?: Configuration) => {
  const UsersAPI = async () => new UsersApi(configOverride ?? (await defaultConfig()));

  return {
    authorize: async (userLoginRequest: UserLoginRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).authorizeUser(userLoginRequest, initOverrides),
    list: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).listUsers(initOverrides),

    post: async (userPostRequest?: UserPostRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).postUser(userPostRequest, initOverrides),

    get: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getUser(id, initOverrides),

    getByEmail: (_email: string, _initOverrides?: RequestInit | InitOverrideFunction): Promise<UserDetails> =>
      Promise.resolve({} as UserDetails),

    linkAccount: async (_requestParameters: GetUserRequest, _initOverrides?: RequestInit | InitOverrideFunction) =>
      Promise.resolve({} as UserDetails),

    unlinkAccount: async (_requestParameters: GetUserRequest, _initOverrides?: RequestInit | InitOverrideFunction) =>
      Promise.resolve({} as UserDetails),

    getUserByProvider: async (
      _requestParameters: GetUserRequest,
      _initOverrides?: RequestInit | InitOverrideFunction,
    ) => Promise.resolve({} as UserDetails),

    patch: async (id: string, userDetails?: UserDetails, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).patchUser(id, userDetails, initOverrides),

    delete: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).deleteUser(id, initOverrides),

    me: async (initOverrides?: RequestInit | InitOverrideFunction) => {
      return (await UsersAPI()).getMe(initOverrides);
    },
  };
};

const Games = (configOverride?: Configuration) => {
  const GamesAPI = async () => new GamesApi(configOverride ?? (await defaultConfig()));

  return {
    listGames: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).listGames(initOverrides),
    postGame: async (game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).postGame(game, initOverrides),

    getGame: async (id: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).getGame(id, initOverrides),

    patchGame: async (id: number, game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).patchGame(id, game, initOverrides),

    deleteGame: async (id: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).deleteGame(id, initOverrides),
  };
};

const Tournaments = (configOverride?: Configuration) => {
  const PhasesAPI = async () => new PhasesApi(configOverride ?? (await defaultConfig()));
  const TournamentsAPI = async () => new TournamentsApi(configOverride ?? (await defaultConfig()));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).listTournaments(initOverrides),

    get: async (id: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).getTournament(id, initOverrides),

    post: async (tournamentId: number, phase?: Phase, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await PhasesAPI()).postTournamentPhase(tournamentId, phase, initOverrides),

    patch: async (
      tournamentId: number,
      id: number,
      phase?: Phase,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) =>
      // TODO - figure out what the correct type is for the id parameter is
      (await PhasesAPI()).patchTournamentPhase(tournamentId, id, phase, initOverrides),

    Phases: {
      list: async (tournamentId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await PhasesAPI()).listTournamentPhases(tournamentId, initOverrides),
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
