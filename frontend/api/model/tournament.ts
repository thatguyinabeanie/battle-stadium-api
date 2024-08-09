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
import type { Format } from "./format";
// May contain unused imports in some cases
// @ts-ignore
import type { Game } from "./game";
// May contain unused imports in some cases
// @ts-ignore
import type { Organization } from "./organization";

/**
 *
 * @export
 * @interface Tournament
 */
export interface Tournament {
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  start_at: string | null;
  /**
   *
   * @type {Organization}
   * @memberof Tournament
   */
  organization: Organization;
  /**
   *
   * @type {Format}
   * @memberof Tournament
   */
  format: Format;
  /**
   *
   * @type {Game}
   * @memberof Tournament
   */
  game: Game;
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  player_cap: number | null;
  /**
   *
   * @type {number}
   * @memberof Tournament
   */
  player_count: number;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  end_at?: string | null;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  started_at?: string | null;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  ended_at?: string | null;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  registration_start_at: string;
  /**
   *
   * @type {string}
   * @memberof Tournament
   */
  registration_end_at: string | null;
  /**
   *
   * @type {boolean}
   * @memberof Tournament
   */
  late_registration: boolean;
}
