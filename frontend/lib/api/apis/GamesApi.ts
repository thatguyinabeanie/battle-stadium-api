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
import type { Game, GameDetail } from "../models/index";
import { GameFromJSON, GameToJSON, GameDetailFromJSON, GameDetailToJSON } from "../models/index";

export interface DeleteGameRequest {
  id: number;
}

export interface GetGameRequest {
  id: number;
}

export interface PatchGameRequest {
  id: number;
  game?: Game;
}

export interface PostGameRequest {
  game?: Game;
}

/**
 *
 */
export class GamesApi extends runtime.BaseAPI {
  /**
   * Deletes a game by ID.
   * Delete Game
   */
  async deleteGameRaw(
    requestParameters: DeleteGameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError("id", 'Required parameter "id" was null or undefined when calling deleteGame().');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/games/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters["id"]))),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes a game by ID.
   * Delete Game
   */
  async deleteGame(id: number, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
    await this.deleteGameRaw({ id: id }, initOverrides);
  }

  /**
   * Retrieves a specific game by ID.
   * Show Game
   */
  async getGameRaw(
    requestParameters: GetGameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GameDetail>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError("id", 'Required parameter "id" was null or undefined when calling getGame().');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/games/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters["id"]))),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GameDetailFromJSON(jsonValue));
  }

  /**
   * Retrieves a specific game by ID.
   * Show Game
   */
  async getGame(id: number, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameDetail> {
    const response = await this.getGameRaw({ id: id }, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a list of all games
   * List Games
   */
  async listGamesRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Game>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/games`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GameFromJSON));
  }

  /**
   * Retrieves a list of all games
   * List Games
   */
  async listGames(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Game>> {
    const response = await this.listGamesRaw(initOverrides);
    return await response.value();
  }

  /**
   * Updates a game by ID.
   * Update Game
   */
  async patchGameRaw(
    requestParameters: PatchGameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GameDetail>> {
    if (requestParameters["id"] == null) {
      throw new runtime.RequiredError("id", 'Required parameter "id" was null or undefined when calling patchGame().');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/api/v1/games/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters["id"]))),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: GameToJSON(requestParameters["game"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GameDetailFromJSON(jsonValue));
  }

  /**
   * Updates a game by ID.
   * Update Game
   */
  async patchGame(
    id: number,
    game?: Game,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<GameDetail> {
    const response = await this.patchGameRaw({ id: id, game: game }, initOverrides);
    return await response.value();
  }

  /**
   * Creates a new game.
   * Create Game
   */
  async postGameRaw(
    requestParameters: PostGameRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GameDetail>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/api/v1/games`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: GameToJSON(requestParameters["game"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GameDetailFromJSON(jsonValue));
  }

  /**
   * Creates a new game.
   * Create Game
   */
  async postGame(game?: Game, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameDetail> {
    const response = await this.postGameRaw({ game: game }, initOverrides);
    return await response.value();
  }
}
