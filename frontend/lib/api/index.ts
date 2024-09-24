import { components } from "./openapi-v1";

export type Schemas = components["schemas"]
export type Format = Schemas["Format"];
export type Game = Schemas["Game"];
export type GameDetail = Schemas["GameDetail"];
export type User = Schemas["User"];
export type UserDetails = Schemas["UserDetails"];
export type UserMe = Schemas["UserMe"];
export type UserPostRequest = Schemas["UserPostRequest"];
export type UserRequest = Schemas["UserRequest"];
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
export type GetSessionRequest = Schemas["GetSessionRequest"];
export type Session = Schemas["Session"];
export type SessionAndUser = Schemas["SessionAndUser"];
export type Error = Schemas["Error"];
export type Message = Schemas["Message"];
export type Pagination = Schemas["Pagination"];


export type Responses = components["responses"];
export type NotFound = Responses["NotFound"];

export type Parameters = components["parameters"];
export type Page = Parameters["Page"];
export type PageSize = Parameters["PerPage"];
export type VercelTokenHeader = Parameters["VercelTokenHeader"];
