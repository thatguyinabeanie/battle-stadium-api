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

import { mapValues } from "../runtime"
/**
 *
 * @export
 * @interface Round
 */
export interface Round {
  /**
   *
   * @type {number}
   * @memberof Round
   */
  id: number
  /**
   *
   * @type {number}
   * @memberof Round
   */
  phaseId: number
  /**
   *
   * @type {number}
   * @memberof Round
   */
  roundNumber: number
  /**
   *
   * @type {Date}
   * @memberof Round
   */
  startedAt: Date | null
  /**
   *
   * @type {Date}
   * @memberof Round
   */
  endedAt: Date | null
}

/**
 * Check if a given object implements the Round interface.
 */
export function instanceOfRound(value: object): value is Round {
  if (!("id" in value) || value["id"] === undefined) return false
  if (!("phaseId" in value) || value["phaseId"] === undefined) return false
  if (!("roundNumber" in value) || value["roundNumber"] === undefined) return false
  if (!("startedAt" in value) || value["startedAt"] === undefined) return false
  if (!("endedAt" in value) || value["endedAt"] === undefined) return false
  return true
}

export function RoundFromJSON(json: any): Round {
  return RoundFromJSONTyped(json, false)
}

export function RoundFromJSONTyped(json: any, ignoreDiscriminator: boolean): Round {
  if (json == null) {
    return json
  }
  return {
    id: json["id"],
    phaseId: json["phase_id"],
    roundNumber: json["round_number"],
    startedAt: json["started_at"] == null ? null : new Date(json["started_at"]),
    endedAt: json["ended_at"] == null ? null : new Date(json["ended_at"]),
  }
}

export function RoundToJSON(value?: Round | null): any {
  if (value == null) {
    return value
  }
  return {
    id: value["id"],
    phase_id: value["phaseId"],
    round_number: value["roundNumber"],
    started_at: value["startedAt"] == null ? null : (value["startedAt"] as any).toISOString(),
    ended_at: value["endedAt"] == null ? null : (value["endedAt"] as any).toISOString(),
  }
}
