// TODO: fix generateFactories.ts to generate factories for all the types

import { faker } from "@faker-js/faker";
import { Factory } from "rosie";

import {
  DeleteGameRequest,
  GetGameRequest,
  PatchGameRequest,
  PostGameRequest,
  DeleteOrganizationRequest,
  GetOrganizationRequest,
  ListOrganizationStaffRequest,
  PatchOrganizationRequest,
  PatchOrganizationTournamentRequest,
  PostOrganizationRequest,
  PostOrganizationTournamentRequest,
  DeleteTournamentPhaseRequest,
  ListTournamentPhasesRequest,
  PatchTournamentPhaseRequest,
  PostTournamentPhaseRequest,
  ShowTournamentPhaseRequest,
  DeleteTournamentPlayerRequest,
  ListPlayersRequest,
  PostTournamentPlayerRequest,
  PutTournamentPlayerRequest,
  ShowTournamentPlayerRequest,
  LoginUserRequest,
  GetTournamentRequest,
  DeleteUserRequest,
  GetUserRequest,
  PatchUserRequest,
  PostUserRequest,
} from "@/lib/fetch-api/apis";

export const DeleteGameRequestFactory =
  new Factory<DeleteGameRequest>().sequence("id");

export const GetGameRequestFactory = new Factory<GetGameRequest>().sequence(
  "id",
);

export const PatchGameRequestFactory = new Factory<PatchGameRequest>()
  .sequence("id")
  .attr("game", () => GameFactory.build());

export const PostGameRequestFactory = new Factory<PostGameRequest>().attr(
  "game",
  () => GameFactory.build(),
);

export const DeleteOrganizationRequestFactory =
  new Factory<DeleteOrganizationRequest>().sequence("id");

export const GetOrganizationRequestFactory =
  new Factory<GetOrganizationRequest>().sequence("id");

export const ListOrganizationStaffRequestFactory =
  new Factory<ListOrganizationStaffRequest>().sequence("id");

export const PatchOrganizationRequestFactory =
  new Factory<PatchOrganizationRequest>()
    .sequence("id")
    .attr("organization", () => OrganizationFactory.build());

export const PatchOrganizationTournamentRequestFactory =
  new Factory<PatchOrganizationTournamentRequest>()
    .attr("organizationId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id")
    .attr("tournamentDetails", () => TournamentDetailsFactory.build());

export const PostOrganizationRequestFactory =
  new Factory<PostOrganizationRequest>().attr("organization", () =>
    OrganizationFactory.build(),
  );

export const PostOrganizationTournamentRequestFactory =
  new Factory<PostOrganizationTournamentRequest>()
    .attr("organizationId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("tournamentDetails", () => TournamentDetailsFactory.build());

export const DeleteTournamentPhaseRequestFactory =
  new Factory<DeleteTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");

export const ListTournamentPhasesRequestFactory =
  new Factory<ListTournamentPhasesRequest>().attr("tournamentId", () =>
    faker.number.int({ min: 1, max: 100 }),
  );

export const PatchTournamentPhaseRequestFactory =
  new Factory<PatchTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id")
    .attr("phase", () => PhaseFactory.build());

export const PostTournamentPhaseRequestFactory =
  new Factory<PostTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("phase", () => PhaseFactory.build());

export const ShowTournamentPhaseRequestFactory =
  new Factory<ShowTournamentPhaseRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");

export const DeleteTournamentPlayerRequestFactory =
  new Factory<DeleteTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");

export const ListPlayersRequestFactory = new Factory<ListPlayersRequest>().attr(
  "tournamentId",
  () => faker.number.int({ min: 1, max: 100 }),
);

export const PostTournamentPlayerRequestFactory =
  new Factory<PostTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .attr("playerRequest", () => PlayerRequestFactory.build());

export const PutTournamentPlayerRequestFactory =
  new Factory<PutTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id")
    .attr("playerRequest", () => PlayerRequestFactory.build());

export const ShowTournamentPlayerRequestFactory =
  new Factory<ShowTournamentPlayerRequest>()
    .attr("tournamentId", () => faker.number.int({ min: 1, max: 100 }))
    .sequence("id");

export const LoginUserRequestFactory = new Factory<LoginUserRequest>().attr(
  "userLoginRequest",
  () => UserLoginRequestFactory.build(),
);

export const GetTournamentRequestFactory =
  new Factory<GetTournamentRequest>().sequence("id");

export const DeleteUserRequestFactory =
  new Factory<DeleteUserRequest>().sequence("id");

export const GetUserRequestFactory = new Factory<GetUserRequest>().sequence(
  "id",
);

export const PatchUserRequestFactory = new Factory<PatchUserRequest>()
  .sequence("id")
  .attr("userDetails", () => UserDetailsFactory.build());

export const PostUserRequestFactory = new Factory<PostUserRequest>().attr(
  "userPostRequest",
  () => UserPostRequestFactory.build(),
);
