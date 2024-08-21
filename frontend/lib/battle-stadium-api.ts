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
} from "@/lib/api";

export const OrganizationsAPI: OrganizationsApi = new OrganizationsApi();
export const UsersAPI: UsersApi = new UsersApi();
export const GamesAPI: GamesApi = new GamesApi();
export const PhasesAPI: PhasesApi = new PhasesApi();
export const TournamentsAPI: TournamentsApi = new TournamentsApi();

const BattleStadiumAPI = {
  Organizations: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) =>
      OrganizationsAPI.listOrganizations(initOverrides),
    post: (
      requestParameters: PostOrganizationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => OrganizationsAPI.postOrganization(requestParameters, initOverrides),
    get: (
      requestParameters: GetOrganizationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => OrganizationsAPI.getOrganization(requestParameters, initOverrides),

    patch: (
      requestParameters: PatchOrganizationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => OrganizationsAPI.patchOrganization(requestParameters, initOverrides),
    delete: (
      requestParameters: DeleteOrganizationRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => OrganizationsAPI.deleteOrganization(requestParameters, initOverrides),

    Tournaments: {
      post: (
        requestParameters: PostOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) =>
        OrganizationsAPI.postOrganizationTournament(
          requestParameters,
          initOverrides,
        ),
      patch: (
        requestParameters: PatchOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) =>
        OrganizationsAPI.patchOrganizationTournament(
          requestParameters,
          initOverrides,
        ),
    },
    Staff: {
      list: (
        requestParameters: ListOrganizationStaffRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) =>
        OrganizationsAPI.listOrganizationStaff(
          requestParameters,
          initOverrides,
        ),
    },
  },

  Users: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.listUsers(initOverrides),
    post: (
      requestParameters?: PostUserRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => UsersAPI.postUser(requestParameters, initOverrides),
    get: (
      requestParameters: GetUserRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => UsersAPI.getUser(requestParameters, initOverrides),
    patch: (
      requestParameters: PatchUserRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => UsersAPI.patchUser(requestParameters, initOverrides),
    delete: (
      requestParameters: DeleteUserRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => UsersAPI.deleteUser(requestParameters, initOverrides),
    me: (initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.getMe(initOverrides),
  },

  Games: {
    listGames: (initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.listGames(initOverrides),
    postGame: (
      requestParameters?: PostGameRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => GamesAPI.postGame(requestParameters, initOverrides),
    getGame: (
      requestParameters: GetGameRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => GamesAPI.getGame(requestParameters, initOverrides),
    patchGame: (
      requestParameters: PatchGameRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => GamesAPI.patchGame(requestParameters, initOverrides),
    deleteGame: (
      requestParameters: DeleteGameRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => GamesAPI.deleteGame(requestParameters, initOverrides),
  },

  Tournaments: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) =>
      TournamentsAPI.listTournaments(initOverrides),
    get: (
      requestParameters: GetTournamentRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => TournamentsAPI.getTournament(requestParameters, initOverrides),
    post: (
      requestParameters: PostTournamentPhaseRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => PhasesAPI.postTournamentPhase(requestParameters, initOverrides),
    patch: (
      requestParameters: PatchTournamentPhaseRequest,
      initOverrides?: RequestInit | InitOverrideFunction,
    ) => PhasesAPI.patchTournamentPhase(requestParameters, initOverrides),
    Phases: {
      list: (
        requestParameters: ListTournamentPhasesRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => PhasesAPI.listTournamentPhases(requestParameters, initOverrides),
    },
  },
};

export { BattleStadiumAPI };
export default BattleStadiumAPI;
