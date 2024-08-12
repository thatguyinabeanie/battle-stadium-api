import * as API from "./lib/fetch-api";

const OrganizationsAPI: API.OrganizationsApi = new API.OrganizationsApi();
const UsersAPI: API.UsersApi = new API.UsersApi();
const GamesAPI: API.GamesApi = new API.GamesApi();
const PhasesAPI: API.PhasesApi = new API.PhasesApi();
const TournamentsAPI: API.TournamentsApi = new API.TournamentsApi();

const BattleStadiumAPI = {
  Organizations: {
    list: OrganizationsAPI.listOrganizations,
    post: OrganizationsAPI.postOrganization,
    get: OrganizationsAPI.getOrganization,
    patch: OrganizationsAPI.patchOrganization,
    delete: OrganizationsAPI.deleteOrganization,
    Tournaments: {
      post: OrganizationsAPI.postOrganizationTournament,
      patch: OrganizationsAPI.patchOrganizationTournament,
    },
    Staff: {
      list: OrganizationsAPI.listOrganizationStaff,
    },
  },
  Users: {
    listUsers: UsersAPI.listUsers,
    postUser: UsersAPI.postUser,
    getUser: UsersAPI.getUser,
    patchUser: UsersAPI.patchUser,
    deleteUser: UsersAPI.deleteUser,
  },
  Games: {
    listGames: GamesAPI.listGames,
    postGame: GamesAPI.postGame,
    getGame: GamesAPI.getGame,
    patchGame: GamesAPI.patchGame,
    deleteGame: GamesAPI.deleteGame,
  },
  Tournaments: {
    list: TournamentsAPI.listTournaments,
    get: TournamentsAPI.getTournament,
    Phases: PhasesAPI.listTournamentPhases,
    post: PhasesAPI.postTournamentPhase,
    patch: PhasesAPI.patchTournamentPhase,
  },
};

export { BattleStadiumAPI };
