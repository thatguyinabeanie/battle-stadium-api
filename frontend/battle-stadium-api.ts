import { AxiosRequestConfig } from "axios";

import * as API from "./lib/api";

const OrganizationsAPI: API.OrganizationsApi = new API.OrganizationsApi();
const UsersAPI: API.UsersApi = new API.UsersApi();
const GamesAPI: API.GamesApi = new API.GamesApi();
const PhasesAPI: API.PhasesApi = new API.PhasesApi();
const TournamentsAPI: API.TournamentsApi = new API.TournamentsApi();

const BattleStadiumAPI = {
  Organizations: {
    list: async () => (await OrganizationsAPI.listOrganizations()).data,
    post: async (organization: API.OrganizationsApiPostOrganizationRequest) =>
      (await OrganizationsAPI.postOrganization(organization)).data,

    get: async (id: number) =>
      (await OrganizationsAPI.getOrganization({ id })).data,
    patch: async (
      id: number,
      organization: API.OrganizationsApiPatchOrganizationRequest,
      options: AxiosRequestConfig<any>,
    ) =>
      (
        await OrganizationsAPI.patchOrganization(
          { ...organization, id },
          options,
        )
      ).data,
    delete: async (id: number) =>
      (await OrganizationsAPI.deleteOrganization({ id })).data,
    Tournaments: {
      post: async (
        organizationId: number,
        tournament: API.OrganizationsApiPostOrganizationTournamentRequest,
      ) =>
        (
          await OrganizationsAPI.postOrganizationTournament({
            ...tournament,
            organizationId,
          })
        ).data,
      patch: async (
        organizationId: number,
        tournament: API.OrganizationsApiPatchOrganizationTournamentRequest,
        options: AxiosRequestConfig<any>,
      ) =>
        (
          await OrganizationsAPI.patchOrganizationTournament(
            { ...tournament, organizationId },
            options,
          )
        ).data,
    },
    Staff: {
      list: async (organizationId: number) =>
        (await OrganizationsAPI.listOrganizationStaff({ id: organizationId }))
          .data,
    },
  },
  Users: {
    listUsers: async () => (await UsersAPI.listUsers()).data,
    postUser: async (user: API.UsersApiPostUserRequest) =>
      (await UsersAPI.postUser(user)).data,
    getUser: async (id: number) => (await UsersAPI.getUser({ id })).data,
    patchUser: async (
      id: number,
      user: API.UsersApiPatchUserRequest,
      options: AxiosRequestConfig<any>,
    ) => (await UsersAPI.patchUser({ ...user, id }, options)).data,
    deleteUser: async (id: number) => (await UsersAPI.deleteUser({ id })).data,
  },
  Games: {
    listGames: async () => (await GamesAPI.listGames()).data,
    postGame: async (game: API.GamesApiPostGameRequest) =>
      (await GamesAPI.postGame(game)).data,
    getGame: async (id: number) => (await GamesAPI.getGame({ id })).data,
    patchGame: async (
      id: number,
      game: API.GamesApiPatchGameRequest,
      options: AxiosRequestConfig<any>,
    ) => (await GamesAPI.patchGame({ ...game, id }, options)).data,
    deleteGame: async (id: number) => (await GamesAPI.deleteGame({ id })).data,
  },
  Tournaments: {
    list: async () => (await TournamentsAPI.listTournaments()).data,
    get: async (id: number) =>
      (await TournamentsAPI.getTournament({ id })).data,
    Phases: {
      list: async (tournamentId: number) =>
        (await PhasesAPI.listTournamentPhases({ tournamentId })).data,
      post: async (
        tournamentId: number,
        phase: API.PhasesApiPostTournamentPhaseRequest,
      ) =>
        (
          await PhasesAPI.postTournamentPhase({
            ...phase,
            tournamentId,
          })
        ).data,
      patch: async (
        tournament_id: number,
        phase: API.PhasesApiPatchTournamentPhaseRequest,
        options: AxiosRequestConfig<any>,
      ) =>
        (
          await PhasesAPI.patchTournamentPhase(
            { ...phase, id: tournament_id },
            options,
          )
        ).data,
    },
  },
};

export { BattleStadiumAPI };
