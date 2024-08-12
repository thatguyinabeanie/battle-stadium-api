/* tslint:disable */
/* eslint-disable */
/**
 * API V1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from "../runtime";
import type { Format } from "./Format";
import { FormatFromJSON, FormatFromJSONTyped, FormatToJSON } from "./Format";
import type { Game } from "./Game";
import { GameFromJSON, GameFromJSONTyped, GameToJSON } from "./Game";
import type { Organization } from "./Organization";
import {
  OrganizationFromJSON,
  OrganizationFromJSONTyped,
  OrganizationToJSON,
} from "./Organization";

/**
 *
 * @export
 * @interface Tournament
 */
export interface Tournament {
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  startAt: Date | null;
  /**
   *
   * @type {Organization}
   * @memberof Tournament
   */
  organization: Organization;
  /**
   *
   * @type {Format}
   * @memberof Tournament
   */
  format: Format;
  /**
   *
   * @type {Game}
   * @memberof Tournament
   */
  game: Game;
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  name: string;
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  playerCap: number | null;
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  playerCount: number;
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  endAt?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  startedAt?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  endedAt?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  registrationStartAt: Date | null;
  /**
   *
   * @type {Date}
   * @memberof Tournament
   */
  registrationEndAt: Date | null;
  /**
   *
   * @type {boolean}
   * @memberof Tournament
   */
  lateRegistration: boolean;
}

/**
 * Check if a given object implements the Tournament interface.
 */
export function instanceOfTournament(value: object): value is Tournament {
  if (!("startAt" in value) || value["startAt"] === undefined) return false;
  if (!("organization" in value) || value["organization"] === undefined)
    return false;
  if (!("format" in value) || value["format"] === undefined) return false;
  if (!("game" in value) || value["game"] === undefined) return false;
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("name" in value) || value["name"] === undefined) return false;
  if (!("playerCap" in value) || value["playerCap"] === undefined) return false;
  if (!("playerCount" in value) || value["playerCount"] === undefined)
    return false;
  if (
    !("registrationStartAt" in value) ||
    value["registrationStartAt"] === undefined
  )
    return false;
  if (
    !("registrationEndAt" in value) ||
    value["registrationEndAt"] === undefined
  )
    return false;
  if (!("lateRegistration" in value) || value["lateRegistration"] === undefined)
    return false;
  return true;
}

export function TournamentFromJSON(json: any): Tournament {
  return TournamentFromJSONTyped(json, false);
}

export function TournamentFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): Tournament {
  if (json == null) {
    return json;
  }
  return {
    startAt: json["start_at"] == null ? null : new Date(json["start_at"]),
    organization: OrganizationFromJSON(json["organization"]),
    format: FormatFromJSON(json["format"]),
    game: GameFromJSON(json["game"]),
    id: json["id"],
    name: json["name"],
    playerCap: json["player_cap"],
    playerCount: json["player_count"],
    endAt: json["end_at"] == null ? undefined : new Date(json["end_at"]),
    startedAt:
      json["started_at"] == null ? undefined : new Date(json["started_at"]),
    endedAt: json["ended_at"] == null ? undefined : new Date(json["ended_at"]),
    registrationStartAt:
      json["registration_start_at"] == null
        ? null
        : new Date(json["registration_start_at"]),
    registrationEndAt:
      json["registration_end_at"] == null
        ? null
        : new Date(json["registration_end_at"]),
    lateRegistration: json["late_registration"],
  };
}

export function TournamentToJSON(value?: Tournament | null): any {
  if (value == null) {
    return value;
  }
  return {
    start_at:
      value["startAt"] == null ? null : (value["startAt"] as any).toISOString(),
    organization: OrganizationToJSON(value["organization"]),
    format: FormatToJSON(value["format"]),
    game: GameToJSON(value["game"]),
    id: value["id"],
    name: value["name"],
    player_cap: value["playerCap"],
    player_count: value["playerCount"],
    end_at:
      value["endAt"] == null
        ? undefined
        : (value["endAt"] as any).toISOString(),
    started_at:
      value["startedAt"] == null
        ? undefined
        : (value["startedAt"] as any).toISOString(),
    ended_at:
      value["endedAt"] == null
        ? undefined
        : (value["endedAt"] as any).toISOString(),
    registration_start_at:
      value["registrationStartAt"] == null
        ? null
        : (value["registrationStartAt"] as any).toISOString(),
    registration_end_at:
      value["registrationEndAt"] == null
        ? null
        : (value["registrationEndAt"] as any).toISOString(),
    late_registration: value["lateRegistration"],
  };
}
