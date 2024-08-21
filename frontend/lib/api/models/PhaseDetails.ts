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
import type { Player } from "./Player";
import { PlayerFromJSON, PlayerFromJSONTyped, PlayerToJSON } from "./Player";
import type { Round } from "./Round";
import { RoundFromJSON, RoundFromJSONTyped, RoundToJSON } from "./Round";

/**
 *
 * @export
 * @interface PhaseDetails
 */
export interface PhaseDetails {
  /**
   *
   * @type {number}
   * @memberof PhaseDetails
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof PhaseDetails
   */
  name: string;
  /**
   *
   * @type {number}
   * @memberof PhaseDetails
   */
  order: number;
  /**
   *
   * @type {string}
   * @memberof PhaseDetails
   */
  type?: string;
  /**
   *
   * @type {number}
   * @memberof PhaseDetails
   */
  tournamentId: number;
  /**
   *
   * @type {number}
   * @memberof PhaseDetails
   */
  numberOfRounds: number;
  /**
   *
   * @type {number}
   * @memberof PhaseDetails
   */
  bestOf: number;
  /**
   *
   * @type {Date}
   * @memberof PhaseDetails
   */
  startedAt: Date | null;
  /**
   *
   * @type {Date}
   * @memberof PhaseDetails
   */
  endedAt: Date | null;
  /**
   *
   * @type {Date}
   * @memberof PhaseDetails
   */
  createdAt?: Date;
  /**
   *
   * @type {Date}
   * @memberof PhaseDetails
   */
  updatedAt?: Date;
  /**
   *
   * @type {Array<Player>}
   * @memberof PhaseDetails
   */
  players: Array<Player>;
  /**
   *
   * @type {Array<Round>}
   * @memberof PhaseDetails
   */
  rounds: Array<Round>;
}

/**
 * Check if a given object implements the PhaseDetails interface.
 */
export function instanceOfPhaseDetails(value: object): value is PhaseDetails {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("name" in value) || value["name"] === undefined) return false;
  if (!("order" in value) || value["order"] === undefined) return false;
  if (!("tournamentId" in value) || value["tournamentId"] === undefined) return false;
  if (!("numberOfRounds" in value) || value["numberOfRounds"] === undefined) return false;
  if (!("bestOf" in value) || value["bestOf"] === undefined) return false;
  if (!("startedAt" in value) || value["startedAt"] === undefined) return false;
  if (!("endedAt" in value) || value["endedAt"] === undefined) return false;
  if (!("players" in value) || value["players"] === undefined) return false;
  if (!("rounds" in value) || value["rounds"] === undefined) return false;
  return true;
}

export function PhaseDetailsFromJSON(json: any): PhaseDetails {
  return PhaseDetailsFromJSONTyped(json, false);
}

export function PhaseDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PhaseDetails {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    name: json["name"],
    order: json["order"],
    type: json["type"] == null ? undefined : json["type"],
    tournamentId: json["tournament_id"],
    numberOfRounds: json["number_of_rounds"],
    bestOf: json["best_of"],
    startedAt: json["started_at"] == null ? null : new Date(json["started_at"]),
    endedAt: json["ended_at"] == null ? null : new Date(json["ended_at"]),
    createdAt: json["created_at"] == null ? undefined : new Date(json["created_at"]),
    updatedAt: json["updated_at"] == null ? undefined : new Date(json["updated_at"]),
    players: (json["players"] as Array<any>).map(PlayerFromJSON),
    rounds: (json["rounds"] as Array<any>).map(RoundFromJSON),
  };
}

export function PhaseDetailsToJSON(value?: PhaseDetails | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    name: value["name"],
    order: value["order"],
    type: value["type"],
    tournament_id: value["tournamentId"],
    number_of_rounds: value["numberOfRounds"],
    best_of: value["bestOf"],
    started_at: value["startedAt"] == null ? null : (value["startedAt"] as any).toISOString(),
    ended_at: value["endedAt"] == null ? null : (value["endedAt"] as any).toISOString(),
    created_at: value["createdAt"] == null ? undefined : value["createdAt"].toISOString(),
    updated_at: value["updatedAt"] == null ? undefined : value["updatedAt"].toISOString(),
    players: (value["players"] as Array<any>).map(PlayerToJSON),
    rounds: (value["rounds"] as Array<any>).map(RoundToJSON),
  };
}
