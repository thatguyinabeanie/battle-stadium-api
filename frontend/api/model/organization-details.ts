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

// May contain unused imports in some cases
// @ts-ignore
import type { UserDetails } from "./user-details";

/**
 *
 * @export
 * @interface OrganizationDetails
 */
export interface OrganizationDetails {
  /**
   *
   * @type {number}
   * @memberof OrganizationDetails
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof OrganizationDetails
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof OrganizationDetails
   */
  description: string;
  /**
   *
   * @type {UserDetails}
   * @memberof OrganizationDetails
   */
  owner: UserDetails;
  /**
   *
   * @type {string}
   * @memberof OrganizationDetails
   */
  updated_at: string;
  /**
   *
   * @type {string}
   * @memberof OrganizationDetails
   */
  created_at: string;
}