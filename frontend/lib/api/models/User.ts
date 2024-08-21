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
 * @interface User
 */
export interface User {
  /**
   *
   * @type {string}
   * @memberof User
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  pronouns: string;
  /**
   *
   * @type {number}
   * @memberof User
   */
  id: number;
}

/**
 * Check if a given object implements the User interface.
 */
export function instanceOfUser(value: object): value is User {
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("id" in value) || value["id"] === undefined) return false;
  return true;
}

export function UserFromJSON(json: any): User {
  return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"],
    pronouns: json["pronouns"],
    id: json["id"],
  };
}

export function UserToJSON(value?: User | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    pronouns: value["pronouns"],
    id: value["id"],
  };
}
