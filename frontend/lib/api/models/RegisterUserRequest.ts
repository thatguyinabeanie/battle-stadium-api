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
 * @interface RegisterUserRequest
 */
export interface RegisterUserRequest {
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  username?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  firstName?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  lastName?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  password: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserRequest
   */
  passwordConfirmation: string;
}

/**
 * Check if a given object implements the RegisterUserRequest interface.
 */
export function instanceOfRegisterUserRequest(value: object): value is RegisterUserRequest {
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("password" in value) || value["password"] === undefined) return false;
  if (!("passwordConfirmation" in value) || value["passwordConfirmation"] === undefined) return false;
  return true;
}

export function RegisterUserRequestFromJSON(json: any): RegisterUserRequest {
  return RegisterUserRequestFromJSONTyped(json, false);
}

export function RegisterUserRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterUserRequest {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"] == null ? undefined : json["username"],
    firstName: json["first_name"] == null ? undefined : json["first_name"],
    lastName: json["last_name"] == null ? undefined : json["last_name"],
    email: json["email"],
    password: json["password"],
    passwordConfirmation: json["password_confirmation"],
  };
}

export function RegisterUserRequestToJSON(value?: RegisterUserRequest | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    email: value["email"],
    password: value["password"],
    password_confirmation: value["passwordConfirmation"],
  };
}