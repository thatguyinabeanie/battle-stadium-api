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

import * as runtime from "../runtime";
import type { Player, PlayerDetails, PlayerRequest } from "../models/index";
import {
  PlayerFromJSON,
  PlayerToJSON,
  PlayerDetailsFromJSON,
  PlayerDetailsToJSON,
  PlayerRequestFromJSON,
  PlayerRequestToJSON,
} from "../models/index";

export interface DeleteTournamentPlayerRequest {
  tournamentId: number;
  id: number;
}

export interface ListPlayersRequest {
  tournamentId: number;
}

export interface PostTournamentPlayerRequest {
  tournamentId: number;
  playerRequest?: PlayerRequest;
}

export interface PutTournamentPlayerRequest {
  tournamentId: number;
  id: number;
  playerRequest?: PlayerRequest;
}

export interface ShowTournamentPlayerRequest {
  tournamentId: number;
  id: number;
}

/**
 *
 */
export class PlayersApi extends runtime.BaseAPI {
  /**
   * Deletes a Player.
   * Delete Tournament Player
   */
  async deleteTournamentPlayerRaw(
    requestParameters: DeleteTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling deleteTournamentPlayer().',
      );
    }

    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling deleteTournamentPlayer().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/tournaments/{tournament_id}/players/{id}`
          .replace(
            `{${"tournament_id"}}`,
            encodeURIComponent(String(requestParameters["tournamentId"])),
          )
          .replace(
            `{${"id"}}`,
            encodeURIComponent(String(requestParameters["id"])),
          ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes a Player.
   * Delete Tournament Player
   */
  async deleteTournamentPlayer(
    requestParameters: DeleteTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.deleteTournamentPlayerRaw(requestParameters, initOverrides);
  }

  /**
   * Retrieves a list of all Players
   * List Tournament Players
   */
  async listPlayersRaw(
    requestParameters: ListPlayersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Player>>> {
    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling listPlayers().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/tournaments/{tournament_id}/players`.replace(
          `{${"tournament_id"}}`,
          encodeURIComponent(String(requestParameters["tournamentId"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(PlayerFromJSON),
    );
  }

  /**
   * Retrieves a list of all Players
   * List Tournament Players
   */
  async listPlayers(
    requestParameters: ListPlayersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<Player>> {
    const response = await this.listPlayersRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Creates a new Player.
   * Create Tournament Player
   */
  async postTournamentPlayerRaw(
    requestParameters: PostTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<PlayerDetails>> {
    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling postTournamentPlayer().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/api/v1/tournaments/{tournament_id}/players`.replace(
          `{${"tournament_id"}}`,
          encodeURIComponent(String(requestParameters["tournamentId"])),
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: PlayerRequestToJSON(requestParameters["playerRequest"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PlayerDetailsFromJSON(jsonValue),
    );
  }

  /**
   * Creates a new Player.
   * Create Tournament Player
   */
  async postTournamentPlayer(
    requestParameters: PostTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<PlayerDetails> {
    const response = await this.postTournamentPlayerRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Updates a Player.
   * Update Tournament Player
   */
  async putTournamentPlayerRaw(
    requestParameters: PutTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<PlayerDetails>> {
    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling putTournamentPlayer().',
      );
    }

    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling putTournamentPlayer().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/api/v1/tournaments/{tournament_id}/players/{id}`
          .replace(
            `{${"tournament_id"}}`,
            encodeURIComponent(String(requestParameters["tournamentId"])),
          )
          .replace(
            `{${"id"}}`,
            encodeURIComponent(String(requestParameters["id"])),
          ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: PlayerRequestToJSON(requestParameters["playerRequest"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PlayerDetailsFromJSON(jsonValue),
    );
  }

  /**
   * Updates a Player.
   * Update Tournament Player
   */
  async putTournamentPlayer(
    requestParameters: PutTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<PlayerDetails> {
    const response = await this.putTournamentPlayerRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Retrieves a Player
   * Show Tournament Player
   */
  async showTournamentPlayerRaw(
    requestParameters: ShowTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<PlayerDetails>> {
    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling showTournamentPlayer().',
      );
    }

    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError(
        "id",
        'Required parameter "id" was null or undefined when calling showTournamentPlayer().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/tournaments/{tournament_id}/players/{id}`
          .replace(
            `{${"tournament_id"}}`,
            encodeURIComponent(String(requestParameters["tournamentId"])),
          )
          .replace(
            `{${"id"}}`,
            encodeURIComponent(String(requestParameters["id"])),
          ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PlayerDetailsFromJSON(jsonValue),
    );
  }

  /**
   * Retrieves a Player
   * Show Tournament Player
   */
  async showTournamentPlayer(
    requestParameters: ShowTournamentPlayerRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<PlayerDetails> {
    const response = await this.showTournamentPlayerRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }
}