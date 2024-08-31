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
 * @interface UserDetails
 */
export interface UserDetails {
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  pronouns: string;
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  lastName: string;
  /**
   *
   * @type {Date}
   * @memberof UserDetails
   */
  emailVerifiedAt?: Date | null;
  /**
   *
   * @type {string}
   * @memberof UserDetails
   */
  id: string;
}

/**
 * Check if a given object implements the UserDetails interface.
 */
export function instanceOfUserDetails(value: object): value is UserDetails {
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("firstName" in value) || value["firstName"] === undefined) return false;
  if (!("lastName" in value) || value["lastName"] === undefined) return false;
  if (!("id" in value) || value["id"] === undefined) return false;
  return true;
}

export function UserDetailsFromJSON(json: any): UserDetails {
  return UserDetailsFromJSONTyped(json, false);
}

export function UserDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDetails {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"],
    pronouns: json["pronouns"],
    email: json["email"],
    firstName: json["first_name"],
    lastName: json["last_name"],
    emailVerifiedAt: json["email_verified_at"] == null ? undefined : new Date(json["email_verified_at"]),
    id: json["id"],
  };
}

export function UserDetailsToJSON(value?: UserDetails | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    pronouns: value["pronouns"],
    email: value["email"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    email_verified_at: value["emailVerifiedAt"] == null ? undefined : (value["emailVerifiedAt"] as any).toISOString(),
    id: value["id"],
  };
}
