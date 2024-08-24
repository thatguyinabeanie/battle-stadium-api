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
 * @interface UserLoginResponse
 */
export interface UserLoginResponse {
  /**
   *
   * @type {number}
   * @memberof UserLoginResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  message: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  pronouns: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  lastName: string;
  /**
   *
   * @type {string}
   * @memberof UserLoginResponse
   */
  token: string;
}

/**
 * Check if a given object implements the UserLoginResponse interface.
 */
export function instanceOfUserLoginResponse(value: object): value is UserLoginResponse {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("message" in value) || value["message"] === undefined) return false;
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("firstName" in value) || value["firstName"] === undefined) return false;
  if (!("lastName" in value) || value["lastName"] === undefined) return false;
  if (!("token" in value) || value["token"] === undefined) return false;
  return true;
}

export function UserLoginResponseFromJSON(json: any): UserLoginResponse {
  return UserLoginResponseFromJSONTyped(json, false);
}

export function UserLoginResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserLoginResponse {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    message: json["message"],
    username: json["username"],
    pronouns: json["pronouns"],
    email: json["email"],
    firstName: json["first_name"],
    lastName: json["last_name"],
    token: json["token"],
  };
}

export function UserLoginResponseToJSON(value?: UserLoginResponse | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    message: value["message"],
    username: value["username"],
    pronouns: value["pronouns"],
    email: value["email"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    token: value["token"],
  };
}