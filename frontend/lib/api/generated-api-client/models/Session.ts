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
 * @interface Session
 */
export interface Session {
  /**
   *
   * @type {string}
   * @memberof Session
   */
  username?: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  token: string;
  /**
   *
   * @type {string}
   * @memberof Session
   */
  userId: string;
  /**
   *
   * @type {Date}
   * @memberof Session
   */
  expiresAt: Date;
}

/**
 * Check if a given object implements the Session interface.
 */
export function instanceOfSession(value: object): value is Session {
  if (!("token" in value) || value["token"] === undefined) return false;
  if (!("userId" in value) || value["userId"] === undefined) return false;
  if (!("expiresAt" in value) || value["expiresAt"] === undefined) return false;
  return true;
}

export function SessionFromJSON(json: any): Session {
  return SessionFromJSONTyped(json, false);
}

export function SessionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Session {
  if (json == null) {
    return json;
  }
  return {
    username: json["username"] == null ? undefined : json["username"],
    token: json["token"],
    userId: json["user_id"],
    expiresAt: new Date(json["expires_at"]),
  };
}

export function SessionToJSON(value?: Session | null): any {
  if (value == null) {
    return value;
  }
  return {
    username: value["username"],
    token: value["token"],
    user_id: value["userId"],
    expires_at: value["expiresAt"].toISOString(),
  };
}
