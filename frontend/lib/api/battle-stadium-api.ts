import { auth } from "@clerk/nextjs/server";

import {
  Configuration,
  ConfigurationParameters,
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

export const CACHE_TIMEOUT: number = 300;

export type BattleStadiumAPIClient = ReturnType<typeof BattleStadiumAPI>;
export * from "./generated-api-client";

export const defaultConfig = async (configOverride?: Configuration) => {
  "use server";

  const params: ConfigurationParameters = {
    headers: {
      Authorization: `Bearer ${await auth().getToken()}`,
    },
    ...configOverride,
  };

  return new Configuration(params);
};

export const defaultInitOverrides = (initOverrides?: RequestInit | InitOverrideFunction) => {
  if (typeof initOverrides === "function") {
    throw new Error("InitOverrideFunction is not supported in defaultInitOverrides");
  }

  return {
    next: { revalidate: CACHE_TIMEOUT },
    ...initOverrides,
  };
};

export default function BattleStadiumAPI(configOverride?: Configuration) {
  return {
    Organizations: Organizations(configOverride),
    Users: Users(configOverride),
    Games: Games(configOverride),
    Tournaments: Tournaments(configOverride),
  };
}

function Organizations(configOverride?: Configuration) {
  const OrganizationsAPI = async () => new OrganizationsApi(await defaultConfig(configOverride));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).listOrganizations(initOverrides),

    post: async (requestParameters: Organization, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).postOrganization(requestParameters, defaultInitOverrides(initOverrides)),

    get: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).getOrganization(organizationId, defaultInitOverrides(initOverrides)),

    patch: async (
      organizationId: number,
      organization?: Organization,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) =>
      (await OrganizationsAPI()).patchOrganization(organizationId, organization, defaultInitOverrides(initOverrides)),

    delete: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await OrganizationsAPI()).deleteOrganization(organizationId, defaultInitOverrides(initOverrides)),

    Tournaments: {
      list: async (organizationId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await OrganizationsAPI()).listOrganizationTournaments(organizationId, defaultInitOverrides(initOverrides)),

      post: async (
        organizationId: number,
        tournamentDetails?: TournamentDetails,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) =>
        (await OrganizationsAPI()).postOrganizationTournament(
          organizationId,
          tournamentDetails,
          defaultInitOverrides(initOverrides),
        ),

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
        (await OrganizationsAPI()).listOrganizationStaff(organizationId, defaultInitOverrides(initOverrides)),
    },
  };
}

function Users(configOverride?: Configuration) {
  const UsersAPI = async () => new UsersApi(await defaultConfig(configOverride));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).listUsers(defaultInitOverrides(initOverrides)),

    post: async (userPostRequest?: UserPostRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).postUser(userPostRequest, defaultInitOverrides(initOverrides)),

    get: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getUser(id, defaultInitOverrides(initOverrides)),

    patch: async (id: string, userDetails?: UserDetails, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).patchUser(id, userDetails, defaultInitOverrides(initOverrides)),

    delete: async (id: string, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).deleteUser(id, defaultInitOverrides(initOverrides)),

    me: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await UsersAPI()).getMe(defaultInitOverrides(initOverrides)),
  };
}

function Games(configOverride?: Configuration) {
  const GamesAPI = async () => new GamesApi(await defaultConfig(configOverride));

  return {
    listGames: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).listGames(defaultInitOverrides(initOverrides)),

    postGame: async (game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).postGame(game, defaultInitOverrides(initOverrides)),

    getGame: async (gameId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).getGame(gameId, defaultInitOverrides(initOverrides)),

    patchGame: async (gameId: number, game?: Game, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).patchGame(gameId, game, defaultInitOverrides(initOverrides)),

    deleteGame: async (gameId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await GamesAPI()).deleteGame(gameId, defaultInitOverrides(initOverrides)),
  };
}

function Tournaments(configOverride?: Configuration) {
  const PhasesAPI = async () => new PhasesApi(await defaultConfig(configOverride));
  const TournamentsAPI = async () => new TournamentsApi(await defaultConfig(configOverride));

  return {
    list: async (initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).listTournaments(defaultInitOverrides(initOverrides)),

    get: async (tournamentId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await TournamentsAPI()).getTournament(tournamentId, defaultInitOverrides(initOverrides)),

    post: async (tournamentId: number, phase?: Phase, initOverrides?: RequestInit | InitOverrideFunction) =>
      (await PhasesAPI()).postTournamentPhase(tournamentId, phase, defaultInitOverrides(initOverrides)),

    patch: async (
      tournamentId: number,
      id: number,
      phase?: Phase,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => (await PhasesAPI()).patchTournamentPhase(tournamentId, id, phase, defaultInitOverrides(initOverrides)),

    Phases: {
      list: async (tournamentId: number, initOverrides?: RequestInit | InitOverrideFunction) =>
        (await PhasesAPI()).listTournamentPhases(tournamentId, defaultInitOverrides(initOverrides)),
    },
  };
}

export { BattleStadiumAPI };
