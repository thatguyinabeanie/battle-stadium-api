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
 * @interface RegistrationResponse
 */
export interface RegistrationResponse {
  /**
   *
   * @type {number}
   * @memberof RegistrationResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  lastName: string;
  /**
   *
   * @type {Date}
   * @memberof RegistrationResponse
   */
  createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof RegistrationResponse
   */
  updatedAt: Date;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  pronouns: string | null;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  jti: string;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  name: string | null;
  /**
   *
   * @type {boolean}
   * @memberof RegistrationResponse
   */
  emailVerified: boolean | null;
  /**
   *
   * @type {string}
   * @memberof RegistrationResponse
   */
  image: string | null;
}

/**
 * Check if a given object implements the RegistrationResponse interface.
 */
export function instanceOfRegistrationResponse(value: object): value is RegistrationResponse {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("username" in value) || value["username"] === undefined) return false;
  if (!("firstName" in value) || value["firstName"] === undefined) return false;
  if (!("lastName" in value) || value["lastName"] === undefined) return false;
  if (!("createdAt" in value) || value["createdAt"] === undefined) return false;
  if (!("updatedAt" in value) || value["updatedAt"] === undefined) return false;
  if (!("pronouns" in value) || value["pronouns"] === undefined) return false;
  if (!("jti" in value) || value["jti"] === undefined) return false;
  if (!("name" in value) || value["name"] === undefined) return false;
  if (!("emailVerified" in value) || value["emailVerified"] === undefined) return false;
  if (!("image" in value) || value["image"] === undefined) return false;
  return true;
}

export function RegistrationResponseFromJSON(json: any): RegistrationResponse {
  return RegistrationResponseFromJSONTyped(json, false);
}

export function RegistrationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegistrationResponse {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    email: json["email"],
    username: json["username"],
    firstName: json["first_name"],
    lastName: json["last_name"],
    createdAt: new Date(json["created_at"]),
    updatedAt: new Date(json["updated_at"]),
    pronouns: json["pronouns"],
    jti: json["jti"],
    name: json["name"],
    emailVerified: json["emailVerified"],
    image: json["image"],
  };
}

export function RegistrationResponseToJSON(value?: RegistrationResponse | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    email: value["email"],
    username: value["username"],
    first_name: value["firstName"],
    last_name: value["lastName"],
    created_at: value["createdAt"].toISOString(),
    updated_at: value["updatedAt"].toISOString(),
    pronouns: value["pronouns"],
    jti: value["jti"],
    name: value["name"],
    emailVerified: value["emailVerified"],
    image: value["image"],
  };
}
