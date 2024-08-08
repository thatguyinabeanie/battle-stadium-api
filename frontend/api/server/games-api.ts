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

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  type RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from "../base";
// @ts-ignore
import type { Game } from "../model";
// @ts-ignore
import type { GameDetail } from "../model";
/**
 * GamesApi - axios parameter creator
 * @export
 */
export const GamesApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * Deletes a game by ID.
     * @summary Delete Game
     * @param {number} id ID of the game
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteGame: async (
      id: number,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("deleteGame", "id", id);
      const localVarPath = `/api/v1/games/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions?.headers ?? {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves a specific game by ID.
     * @summary Show Game
     * @param {number} id ID of the game
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getGame: async (
      id: number,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("getGame", "id", id);
      const localVarPath = `/api/v1/games/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions?.headers ?? {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves a list of all games
     * @summary List Games
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listGames: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/games`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions?.headers ?? {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Updates a game by ID.
     * @summary Update Game
     * @param {number} id ID of the game
     * @param {Game} [game]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchGame: async (
      id: number,
      game?: Game,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("patchGame", "id", id);
      const localVarPath = `/api/v1/games/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions?.headers ?? {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        game,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a new game.
     * @summary Create Game
     * @param {Game} [game]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postGame: async (
      game?: Game,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/v1/games`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions?.headers ?? {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        game,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * GamesApi - functional programming interface
 * @export
 */
export const GamesApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = GamesApiAxiosParamCreator(configuration);
  return {
    /**
     * Deletes a game by ID.
     * @summary Delete Game
     * @param {number} id ID of the game
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteGame(
      id: number,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteGame(
        id,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GamesApi.deleteGame"]?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * Retrieves a specific game by ID.
     * @summary Show Game
     * @param {number} id ID of the game
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getGame(
      id: number,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<GameDetail>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGame(
        id,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GamesApi.getGame"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * Retrieves a list of all games
     * @summary List Games
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listGames(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Game>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listGames(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GamesApi.listGames"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * Updates a game by ID.
     * @summary Update Game
     * @param {number} id ID of the game
     * @param {Game} [game]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async patchGame(
      id: number,
      game?: Game,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<GameDetail>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.patchGame(
        id,
        game,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GamesApi.patchGame"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * Creates a new game.
     * @summary Create Game
     * @param {Game} [game]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postGame(
      game?: Game,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<GameDetail>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.postGame(
        game,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GamesApi.postGame"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * GamesApi - factory interface
 * @export
 */
export const GamesApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = GamesApiFp(configuration);
  return {
    /**
     * Deletes a game by ID.
     * @summary Delete Game
     * @param {GamesApiDeleteGameRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteGame(
      requestParameters: GamesApiDeleteGameRequest,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<void> {
      return localVarFp
        .deleteGame(requestParameters.id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Retrieves a specific game by ID.
     * @summary Show Game
     * @param {GamesApiGetGameRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getGame(
      requestParameters: GamesApiGetGameRequest,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<GameDetail> {
      return localVarFp
        .getGame(requestParameters.id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Retrieves a list of all games
     * @summary List Games
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listGames(options?: RawAxiosRequestConfig): AxiosPromise<Array<Game>> {
      return localVarFp
        .listGames(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates a game by ID.
     * @summary Update Game
     * @param {GamesApiPatchGameRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchGame(
      requestParameters: GamesApiPatchGameRequest,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<GameDetail> {
      return localVarFp
        .patchGame(requestParameters.id, requestParameters.game, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Creates a new game.
     * @summary Create Game
     * @param {GamesApiPostGameRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postGame(
      requestParameters: GamesApiPostGameRequest = {},
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<GameDetail> {
      return localVarFp
        .postGame(requestParameters.game, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for deleteGame operation in GamesApi.
 * @export
 * @interface GamesApiDeleteGameRequest
 */
export interface GamesApiDeleteGameRequest {
  /**
   * ID of the game
   * @type {number}
   * @memberof GamesApiDeleteGame
   */
  readonly id: number;
}

/**
 * Request parameters for getGame operation in GamesApi.
 * @export
 * @interface GamesApiGetGameRequest
 */
export interface GamesApiGetGameRequest {
  /**
   * ID of the game
   * @type {number}
   * @memberof GamesApiGetGame
   */
  readonly id: number;
}

/**
 * Request parameters for patchGame operation in GamesApi.
 * @export
 * @interface GamesApiPatchGameRequest
 */
export interface GamesApiPatchGameRequest {
  /**
   * ID of the game
   * @type {number}
   * @memberof GamesApiPatchGame
   */
  readonly id: number;

  /**
   *
   * @type {Game}
   * @memberof GamesApiPatchGame
   */
  readonly game?: Game;
}

/**
 * Request parameters for postGame operation in GamesApi.
 * @export
 * @interface GamesApiPostGameRequest
 */
export interface GamesApiPostGameRequest {
  /**
   *
   * @type {Game}
   * @memberof GamesApiPostGame
   */
  readonly game?: Game;
}

/**
 * GamesApi - object-oriented interface
 * @export
 * @class GamesApi
 * @extends {BaseAPI}
 */
export class GamesApi extends BaseAPI {
  /**
   * Deletes a game by ID.
   * @summary Delete Game
   * @param {GamesApiDeleteGameRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GamesApi
   */
  public deleteGame(
    requestParameters: GamesApiDeleteGameRequest,
    options?: RawAxiosRequestConfig,
  ) {
    return GamesApiFp(this.configuration)
      .deleteGame(requestParameters.id, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieves a specific game by ID.
   * @summary Show Game
   * @param {GamesApiGetGameRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GamesApi
   */
  public getGame(
    requestParameters: GamesApiGetGameRequest,
    options?: RawAxiosRequestConfig,
  ) {
    return GamesApiFp(this.configuration)
      .getGame(requestParameters.id, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieves a list of all games
   * @summary List Games
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GamesApi
   */
  public listGames(options?: RawAxiosRequestConfig) {
    return GamesApiFp(this.configuration)
      .listGames(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Updates a game by ID.
   * @summary Update Game
   * @param {GamesApiPatchGameRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GamesApi
   */
  public patchGame(
    requestParameters: GamesApiPatchGameRequest,
    options?: RawAxiosRequestConfig,
  ) {
    return GamesApiFp(this.configuration)
      .patchGame(requestParameters.id, requestParameters.game, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Creates a new game.
   * @summary Create Game
   * @param {GamesApiPostGameRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GamesApi
   */
  public postGame(
    requestParameters: GamesApiPostGameRequest = {},
    options?: RawAxiosRequestConfig,
  ) {
    return GamesApiFp(this.configuration)
      .postGame(requestParameters.game, options)
      .then((request) => request(this.axios, this.basePath));
  }
}