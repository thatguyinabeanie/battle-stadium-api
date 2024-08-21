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
/**
 *
 * @export
 * @interface PlayerRequest
 */
export interface PlayerRequest {
  /**
   *
   * @type {number}
   * @memberof PlayerRequest
   */
  userId: number;
  /**
   *
   * @type {string}
   * @memberof PlayerRequest
   */
  inGameName: string;
}

/**
 * Check if a given object implements the PlayerRequest interface.
 */
export function instanceOfPlayerRequest(value: object): value is PlayerRequest {
  if (!("userId" in value) || value["userId"] === undefined) return false;
  if (!("inGameName" in value) || value["inGameName"] === undefined) return false;
  return true;
}

export function PlayerRequestFromJSON(json: any): PlayerRequest {
  return PlayerRequestFromJSONTyped(json, false);
}

export function PlayerRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerRequest {
  if (json == null) {
    return json;
  }
  return {
    userId: json["user_id"],
    inGameName: json["in_game_name"],
  };
}

export function PlayerRequestToJSON(value?: PlayerRequest | null): any {
  if (value == null) {
    return value;
  }
  return {
    user_id: value["userId"],
    in_game_name: value["inGameName"],
  };
}
