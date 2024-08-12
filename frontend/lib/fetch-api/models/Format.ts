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
 * @interface Format
 */
export interface Format {
  /**
   *
   * @type {number}
   * @memberof Format
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof Format
   */
  name?: string;
}

/**
 * Check if a given object implements the Format interface.
 */
export function instanceOfFormat(value: object): value is Format {
  return true;
}

export function FormatFromJSON(json: any): Format {
  return FormatFromJSONTyped(json, false);
}

export function FormatFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): Format {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"] == null ? undefined : json["id"],
    name: json["name"] == null ? undefined : json["name"],
  };
}

export function FormatToJSON(value?: Format | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    name: value["name"],
  };
}