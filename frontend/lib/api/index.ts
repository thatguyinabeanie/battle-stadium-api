import { components } from "~/lib/api/openapi-v1";
export * from "~/lib/api/client";

export type Schemas = components["schemas"];

export type Format = Schemas["Format"];
export type Game = Schemas["Game"];
export type GameDetail = Schemas["GameDetail"];
export type Account = Schemas["Account"];
export type Profile = Schemas["Profile"];
export type AccountDetails = Schemas["AccountDetails"];
export type AccountMe = Schemas["AccountMe"];
export type AccountPostRequest = Schemas["AccountPostRequest"];
export type AccountRequest = Schemas["AccountRequest"];
export type RegistrationResponse = Schemas["RegistrationResponse"];
export type Organization = Schemas["Organization"];
export type Tournament = Schemas["Tournament"];
export type TournamentDetails = Schemas["TournamentDetails"];
export type Pokemon = Schemas["Pokemon"];
export type PlayerRequest = Schemas["PlayerRequest"];
export type Player = Schemas["Player"];
export type PlayerDetails = Schemas["PlayerDetails"];
export type Round = Schemas["Round"];
export type Phase = Schemas["Phase"];
export type PhaseDetails = Schemas["PhaseDetails"];
export type GameRequest = Schemas["GameRequest"];
export type TournamentRequest = Schemas["TournamentRequest"];
export type TournamentPostRequest = Schemas["TournamentPostRequest"];
export type Error = Schemas["Error"];
export type Message = Schemas["Message"];
export type Pagination = Schemas["Pagination"];

export type Responses = components["responses"];
export type NotFound = Responses["NotFound"];

export type Parameters = components["parameters"];
export type Page = Parameters["Page"];
export type PageSize = Parameters["PerPage"];
export type VercelTokenHeader = Parameters["VercelTokenHeader"];
