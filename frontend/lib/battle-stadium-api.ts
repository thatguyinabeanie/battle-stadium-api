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

const config = () => {
  return new Configuration({
    accessToken: async () => {
      const session = await getSession();

      console.log("config session", session); // eslint-disable-line no-console

      // @ts-expect-error TODO: fix session type
      return session?.accessToken ?? "";
    },
  });
};

const Authentication = () => {
  const SessionsAPI: SessionsApi = new SessionsApi(config());
  const RegistrationAPI = new RegistrationApi(config());

  return {
    login: (requestParameters?: LoginUserRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      SessionsAPI.loginUser(requestParameters, initOverrides),
    logout: (initOverrides?: RequestInit | InitOverrideFunction) => SessionsAPI.logoutUser(initOverrides),
    register: (requestParameters?: RegisterUserOperationRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      RegistrationAPI.registerUser(requestParameters, initOverrides),
  };
};

const Organizations = () => {
  const OrganizationsAPI: OrganizationsApi = new OrganizationsApi(config());

  return {
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
  };
};

const Users = () => {
  const UsersAPI: UsersApi = new UsersApi(config());

  return {
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
  };
};

const Games = () => {
  const GamesAPI: GamesApi = new GamesApi(config());

  return {
    listGames: (initOverrides?: RequestInit | InitOverrideFunction) => GamesAPI.listGames(initOverrides),
    postGame: (requestParameters?: PostGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.postGame(requestParameters, initOverrides),
    getGame: (requestParameters: GetGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.getGame(requestParameters, initOverrides),
    patchGame: (requestParameters: PatchGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.patchGame(requestParameters, initOverrides),
    deleteGame: (requestParameters: DeleteGameRequest, initOverrides?: RequestInit | InitOverrideFunction) =>
      GamesAPI.deleteGame(requestParameters, initOverrides),
  };
};

const Tournaments = () => {
  const PhasesAPI: PhasesApi = new PhasesApi(config());
  const TournamentsAPI: TournamentsApi = new TournamentsApi(config());

  return {
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
