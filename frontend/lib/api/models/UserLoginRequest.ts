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
 * @interface UserLoginRequest
 */
export interface UserLoginRequest {
  /**
   *
   * @type {string}
   * @memberof UserLoginRequest
   */
  username?: string | null;
  /**
   *
   * @type {string}
   * @memberof UserLoginRequest
   */
  email?: string | null;
  /**
   * Must be at least 8 characters
   * @type {string}
   * @memberof UserLoginRequest
   */
  password: string;
}

/**
 * Check if a given object implements the UserLoginRequest interface.
 */
export function instanceOfUserLoginRequest(value: object): value is UserLoginRequest {
  if (!("password" in value) || value["password"] === undefined) return false;
  return true;
}

export function UserLoginRequestFromJSON(json: any): UserLoginRequest {
  return UserLoginRequestFromJSONTyped(json, false);
}

export function UserLoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserLoginRequest {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"] == null ? undefined : json["username"],
    email: json["email"] == null ? undefined : json["email"],
    password: json["password"],
  };
}

export function UserLoginRequestToJSON(value?: UserLoginRequest | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    email: value["email"],
    password: value["password"],
  };
}
