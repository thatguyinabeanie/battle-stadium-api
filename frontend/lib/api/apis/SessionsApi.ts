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
import type { SessionAndUser, UserLoginRequest, UserLoginResponse } from "../models/index";
import {
  SessionAndUserFromJSON,
  SessionAndUserToJSON,
  UserLoginRequestFromJSON,
  UserLoginRequestToJSON,
  UserLoginResponseFromJSON,
  UserLoginResponseToJSON,
} from "../models/index";

export interface LoginUserRequest {
  userLoginRequest?: UserLoginRequest;
}

/**
 *
 */
export class SessionsApi extends runtime.BaseAPI {
  /**
   * Shows the current session.
   * Get Session and User
   */
  async getSessionRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SessionAndUser>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/auth/session`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SessionAndUserFromJSON(jsonValue));
  }

  /**
   * Shows the current session.
   * Get Session and User
   */
  async getSession(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SessionAndUser> {
    const response = await this.getSessionRaw(initOverrides);
    return await response.value();
  }

  /**
   * Logs in a User.
   * Login
   */
  async loginUserRaw(
    requestParameters: LoginUserRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserLoginResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request(
      {
        path: `/api/v1/auth/sign_in`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: UserLoginRequestToJSON(requestParameters["userLoginRequest"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserLoginResponseFromJSON(jsonValue));
  }

  /**
   * Logs in a User.
   * Login
   */
  async loginUser(
    userLoginRequest?: UserLoginRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserLoginResponse> {
    const response = await this.loginUserRaw({ userLoginRequest: userLoginRequest }, initOverrides);
    return await response.value();
  }

  /**
   * Logs out a User.
   * Logout
   */
  async logoutUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/auth/sign_out`,
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Logs out a User.
   * Logout
   */
  async logoutUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
    await this.logoutUserRaw(initOverrides);
  }

  /**
   * Updates the current session.
   * Update Session
   */
  async updateRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SessionAndUser>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/auth/session`,
        method: "PUT",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SessionAndUserFromJSON(jsonValue));
  }

  /**
   * Updates the current session.
   * Update Session
   */
  async update(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SessionAndUser> {
    const response = await this.updateRaw(initOverrides);
    return await response.value();
  }
}
