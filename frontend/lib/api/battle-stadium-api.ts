
import {
  Configuration,
  Game,
  InitOverrideFunction,
  Organization,
  Phase,
  TournamentDetails,
  UserDetails,
  UserPostRequest,
  UsersApi,
  GamesApi,
  PhasesApi,
  TournamentsApi,
  OrganizationsApi,
} from "./generated-api-client";
import { defaultConfig } from "./config";

export function BattleStadiumAPI (configOverride?: Configuration) {
  return {
    Organizations: Organizations(configOverride),
    Users: Users(configOverride),
    Games: Games(configOverride),
    Tournaments: Tournaments(configOverride),
  };
};

export type BattleStadiumAPIClient = ReturnType<typeof BattleStadiumAPI>;

function Organizations(configOverride?: Configuration) {
  const OrganizationsAPI = async () => new OrganizationsApi(await defaultConfig(configOverride));

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
      list: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await OrganizationsAPI()).listOrganizationTournaments(organizationId, initOverrides),

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
}

function Users(configOverride?: Configuration) {
  const UsersAPI = async () => new UsersApi(await defaultConfig(configOverride));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).listUsers(initOverrides),

    post: async (userPostRequest?: UserPostRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).postUser(userPostRequest, initOverrides),

    get: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getUser(id, initOverrides),

    patch: async (id: string, userDetails?: UserDetails, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).patchUser(id, userDetails, initOverrides),

    delete: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).deleteUser(id, initOverrides),

    me: async (initOverrides?: RequestInit | InitOverrideFunction) => (await UsersAPI()).getMe(initOverrides),
  };
}

function Games(configOverride?: Configuration) {
  const GamesAPI = async () => new GamesApi(await defaultConfig(configOverride));

  return {
    listGames: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).listGames(initOverrides),

    postGame: async (game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).postGame(game, initOverrides),

    getGame: async (gameId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).getGame(gameId, initOverrides),

    patchGame: async (gameId: number, game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).patchGame(gameId, game, initOverrides),

    deleteGame: async (gameId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).deleteGame(gameId, initOverrides),
  };
}

function Tournaments(configOverride?: Configuration) {
  const PhasesAPI = async () => new PhasesApi(await defaultConfig(configOverride));
  const TournamentsAPI = async () => new TournamentsApi(await defaultConfig(configOverride));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).listTournaments(initOverrides),

    get: async (tournamentId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).getTournament(tournamentId, initOverrides),

    post: async (tournamentId: number, phase?: Phase, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await PhasesAPI()).postTournamentPhase(tournamentId, phase, initOverrides),

    patch: async (
      tournamentId: number,
      id: number,
      phase?: Phase,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => (await PhasesAPI()).patchTournamentPhase(tournamentId, id, phase, initOverrides),

    Phases: {
      list: async (tournamentId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await PhasesAPI()).listTournamentPhases(tournamentId, initOverrides),
    },
  };
}
