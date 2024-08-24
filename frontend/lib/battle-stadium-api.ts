import { getSession } from "next-auth/react";

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
} from "@/lib/api";

const config = new Configuration({
  accessToken: async () => {
    const session = await getSession();

    return session?.accessToken;
  },
});

export const OrganizationsAPI: OrganizationsApi = new OrganizationsApi(config);
export const UsersAPI: UsersApi = new UsersApi(config);
export const GamesAPI: GamesApi = new GamesApi(config);
export const PhasesAPI: PhasesApi = new PhasesApi(config);
export const TournamentsAPI: TournamentsApi = new TournamentsApi(config);
export const SessionsAPI: SessionsApi = new SessionsApi(config);
export const RegistrationAPI = new RegistrationApi(config);

const BattleStadiumAPI = {
  Authentication: {
    login: (requestParameters?: LoginUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      SessionsAPI.loginUser(requestParameters, initOverrides),
    logout: (initOverrides?: RequestInit | InitOverrideFunction) => SessionsAPI.logoutUser(initOverrides),
    register: (requestParameters?: RegisterUserOperationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      RegistrationAPI.registerUser(requestParameters, initOverrides),
  },
  Organizations: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) => OrganizationsAPI.listOrganizations(initOverrides),
    post: (requestParameters: PostOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      OrganizationsAPI.postOrganization(requestParameters, initOverrides),
    get: (requestParameters: GetOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      OrganizationsAPI.getOrganization(requestParameters, initOverrides),

    patch: (requestParameters: PatchOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      OrganizationsAPI.patchOrganization(requestParameters, initOverrides),
    delete: (requestParameters: DeleteOrganizationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      OrganizationsAPI.deleteOrganization(requestParameters, initOverrides),

    Tournaments: {
      post: (
        requestParameters: PostOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => OrganizationsAPI.postOrganizationTournament(requestParameters, initOverrides),
      patch: (
        requestParameters: PatchOrganizationTournamentRequest,
        initOverrides?: RequestInit | InitOverrideFunction,
      ) => OrganizationsAPI.patchOrganizationTournament(requestParameters, initOverrides),
    },
    Staff: {
      list: (requestParameters: ListOrganizationStaffRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
        OrganizationsAPI.listOrganizationStaff(requestParameters, initOverrides),
    },
  },

  Users: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) => UsersAPI.listUsers(initOverrides),
    post: (requestParameters?: PostUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.postUser(requestParameters, initOverrides),
    get: (requestParameters: GetUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.getUser(requestParameters, initOverrides),
    patch: (requestParameters: PatchUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.patchUser(requestParameters, initOverrides),
    delete: (requestParameters: DeleteUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      UsersAPI.deleteUser(requestParameters, initOverrides),
    me: (initOverrides?: RequestInit | InitOverrideFunction) => UsersAPI.getMe(initOverrides),
  },

  Games: {
    listGames: (initOverrides?: RequestInit | InitOverrideFunction) => GamesAPI.listGames(initOverrides),
    postGame: (requestParameters?: PostGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.postGame(requestParameters, initOverrides),
    getGame: (requestParameters: GetGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.getGame(requestParameters, initOverrides),
    patchGame: (requestParameters: PatchGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.patchGame(requestParameters, initOverrides),
    deleteGame: (requestParameters: DeleteGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.deleteGame(requestParameters, initOverrides),
  },

  Tournaments: {
    list: (initOverrides?: RequestInit | InitOverrideFunction) => TournamentsAPI.listTournaments(initOverrides),
    get: (requestParameters: GetTournamentRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      TournamentsAPI.getTournament(requestParameters, initOverrides),
    post: (requestParameters: PostTournamentPhaseRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      PhasesAPI.postTournamentPhase(requestParameters, initOverrides),
    patch: (requestParameters: PatchTournamentPhaseRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      PhasesAPI.patchTournamentPhase(requestParameters, initOverrides),
    Phases: {
      list: (requestParameters: ListTournamentPhasesRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
        PhasesAPI.listTournamentPhases(requestParameters, initOverrides),
    },
  },
};

export { BattleStadiumAPI };
export default BattleStadiumAPI;
