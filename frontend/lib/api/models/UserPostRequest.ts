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
 * @interface UserPostRequest
 */
export interface UserPostRequest {
  /**
   *
   * @type {string}
   * @memberof UserPostRequest
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof UserPostRequest
   */
  pronouns: string;
  /**
   *
   * @type {string}
   * @memberof UserPostRequest
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserPostRequest
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof UserPostRequest
   */
  lastName: string;
  /**
   * Must be at least 8 characters
   * @type {string}
   * @memberof UserPostRequest
   */
  password: string;
  /**
   * Must match the password.
   * @type {string}
   * @memberof UserPostRequest
   */
  passwordConfirmation: string;
  /**
   *
   * @type {number}
   * @memberof UserPostRequest
   */
  id?: number;
}

/**
 * Check if a given object implements the UserPostRequest interface.
 */
export function instanceOfUserPostRequest(value: object): value is UserPostRequest {
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("firstName" in value) || value["firstName"] === undefined) return false;
  if (!("lastName" in value) || value["lastName"] === undefined) return false;
  if (!("password" in value) || value["password"] === undefined) return false;
  if (!("passwordConfirmation" in value) || value["passwordConfirmation"] === undefined) return false;
  return true;
}

export function UserPostRequestFromJSON(json: any): UserPostRequest {
  return UserPostRequestFromJSONTyped(json, false);
}

export function UserPostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserPostRequest {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"],
    pronouns: json["pronouns"],
    email: json["email"],
    firstName: json["first_name"],
    lastName: json["last_name"],
    password: json["password"],
    passwordConfirmation: json["password_confirmation"],
    id: json["id"] == null ? undefined : json["id"],
  };
}

export function UserPostRequestToJSON(value?: UserPostRequest | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    pronouns: value["pronouns"],
    email: value["email"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    password: value["password"],
    password_confirmation: value["passwordConfirmation"],
    id: value["id"],
  };
}