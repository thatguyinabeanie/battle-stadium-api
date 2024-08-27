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
 * @interface GameRequest
 */
export interface GameRequest {
  /**
   *
   * @type {string}
   * @memberof GameRequest
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof GameRequest
   */
  name: string;
}

/**
 * Check if a given object implements the GameRequest interface.
 */
export function instanceOfGameRequest(value: object): value is GameRequest {
  if (!("name" in value) || value["name"] === undefined) return false;
  return true;
}

export function GameRequestFromJSON(json: any): GameRequest {
  return GameRequestFromJSONTyped(json, false);
}

export function GameRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameRequest {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"] == null ? undefined : json["id"],
    name: json["name"],
  };
}

export function GameRequestToJSON(value?: GameRequest | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    name: value["name"],
  };
}
