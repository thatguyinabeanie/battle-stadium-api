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
import type { User } from "./User";
import { UserFromJSON, UserFromJSONTyped, UserToJSON } from "./User";

/**
 *
 * @export
 * @interface Player
 */
export interface Player {
  /**
   *
   * @type {number}
   * @memberof Player
   */
  id: number;
  /**
   *
   * @type {User}
   * @memberof Player
   */
  user: User;
  /**
   *
   * @type {string}
   * @memberof Player
   */
  inGameName: string;
}

/**
 * Check if a given object implements the Player interface.
 */
export function instanceOfPlayer(value: object): value is Player {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("user" in value) || value["user"] === undefined) return false;
  if (!("inGameName" in value) || value["inGameName"] === undefined) return false;
  return true;
}

export function PlayerFromJSON(json: any): Player {
  return PlayerFromJSONTyped(json, false);
}

export function PlayerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Player {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    user: UserFromJSON(json["user"]),
    inGameName: json["in_game_name"],
  };
}

export function PlayerToJSON(value?: Player | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    user: UserToJSON(value["user"]),
    in_game_name: value["inGameName"],
  };
}
