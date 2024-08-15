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
import type { Organization } from "./Organization";
import {
  OrganizationFromJSON,
  OrganizationFromJSONTyped,
  OrganizationToJSON,
} from "./Organization";

/**
 *
 * @export
 * @interface UserMe
 */
export interface UserMe {
  /**
   *
   * @type {string}
   * @memberof UserMe
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof UserMe
   */
  pronouns: string;
  /**
   *
   * @type {string}
   * @memberof UserMe
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserMe
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof UserMe
   */
  lastName: string;
  /**
   *
   * @type {number}
   * @memberof UserMe
   */
  id: number;
  /**
   *
   * @type {Array<Organization>}
   * @memberof UserMe
   */
  organizations: Array<Organization>;
}

/**
 * Check if a given object implements the UserMe interface.
 */
export function instanceOfUserMe(value: object): value is UserMe {
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("firstName" in value) || value["firstName"] === undefined) return false;
  if (!("lastName" in value) || value["lastName"] === undefined) return false;
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("organizations" in value) || value["organizations"] === undefined)
    return false;
  return true;
}

export function UserMeFromJSON(json: any): UserMe {
  return UserMeFromJSONTyped(json, false);
}

export function UserMeFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UserMe {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"],
    pronouns: json["pronouns"],
    email: json["email"],
    firstName: json["first_name"],
    lastName: json["last_name"],
    id: json["id"],
    organizations: (json["organizations"] as Array<any>).map(
      OrganizationFromJSON,
    ),
  };
}

export function UserMeToJSON(value?: UserMe | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    pronouns: value["pronouns"],
    email: value["email"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    id: value["id"],
    organizations: (value["organizations"] as Array<any>).map(
      OrganizationToJSON,
    ),
  };
}
