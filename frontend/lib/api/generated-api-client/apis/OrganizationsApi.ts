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
import type { Message, Organization, TournamentDetails, User } from "../models/index";
import {
  MessageFromJSON,
  MessageToJSON,
  OrganizationFromJSON,
  OrganizationToJSON,
  TournamentDetailsFromJSON,
  TournamentDetailsToJSON,
  UserFromJSON,
  UserToJSON,
} from "../models/index";

export interface DeleteOrganizationRequest {
  orgId: number;
}

export interface GetOrganizationRequest {
  orgId: number;
}

export interface ListOrganizationStaffRequest {
  orgId: number;
}

export interface ListOrganizationTournamentsRequest {
  orgId: number;
}

export interface PatchOrganizationRequest {
  orgId: number;
  organization?: Organization;
}

export interface PatchOrganizationTournamentRequest {
  orgId: number;
  tournamentId: number;
  tournamentDetails?: TournamentDetails;
}

export interface PostOrganizationRequest {
  organization: Organization;
}

export interface PostOrganizationTournamentRequest {
  orgId: number;
  tournamentDetails?: TournamentDetails;
}

/**
 *
 */
export class OrganizationsApi extends runtime.BaseAPI {
  /**
   * Deletes an organization.
   * Delete Organization
   */
  async deleteOrganizationRaw(
    requestParameters: DeleteOrganizationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Message>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling deleteOrganization().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration?.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MessageFromJSON(jsonValue));
  }

  /**
   * Deletes an organization.
   * Delete Organization
   */
  async deleteOrganization(
    orgId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Message> {
    const response = await this.deleteOrganizationRaw({ orgId: orgId }, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a specific organization.
   * Show Organization
   */
  async getOrganizationRaw(
    requestParameters: GetOrganizationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Organization>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling getOrganization().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrganizationFromJSON(jsonValue));
  }

  /**
   * Retrieves a specific organization.
   * Show Organization
   */
  async getOrganization(
    orgId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Organization> {
    const response = await this.getOrganizationRaw({ orgId: orgId }, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a list of staff members for a specific organization.
   * List Organization Staff
   */
  async listOrganizationStaffRaw(
    requestParameters: ListOrganizationStaffRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<User>>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling listOrganizationStaff().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}/staff`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
  }

  /**
   * Retrieves a list of staff members for a specific organization.
   * List Organization Staff
   */
  async listOrganizationStaff(
    orgId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<User>> {
    const response = await this.listOrganizationStaffRaw({ orgId: orgId }, initOverrides);
    return await response.value();
  }

  /**
   * Retrieves a list of tournaments for a specific organization.
   * List Organization Tournaments
   */
  async listOrganizationTournamentsRaw(
    requestParameters: ListOrganizationTournamentsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<TournamentDetails>>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling listOrganizationTournaments().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}/tournaments`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TournamentDetailsFromJSON));
  }

  /**
   * Retrieves a list of tournaments for a specific organization.
   * List Organization Tournaments
   */
  async listOrganizationTournaments(
    orgId: number,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<TournamentDetails>> {
    const response = await this.listOrganizationTournamentsRaw({ orgId: orgId }, initOverrides);
    return await response.value();
  }

  /**
   * List Organizations
   */
  async listOrganizationsRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<Organization>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v1/organizations`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrganizationFromJSON));
  }

  /**
   * List Organizations
   */
  async listOrganizations(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Organization>> {
    const response = await this.listOrganizationsRaw(initOverrides);
    return await response.value();
  }

  /**
   * Updates an existing organization.
   * Update Organization
   */
  async patchOrganizationRaw(
    requestParameters: PatchOrganizationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Organization>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling patchOrganization().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration?.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: OrganizationToJSON(requestParameters["organization"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrganizationFromJSON(jsonValue));
  }

  /**
   * Updates an existing organization.
   * Update Organization
   */
  async patchOrganization(
    orgId: number,
    organization?: Organization,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Organization> {
    const response = await this.patchOrganizationRaw({ orgId: orgId, organization: organization }, initOverrides);
    return await response.value();
  }

  /**
   * Updates an existing tournament for a given organization.
   * Update Tournament
   */
  async patchOrganizationTournamentRaw(
    requestParameters: PatchOrganizationTournamentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TournamentDetails>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling patchOrganizationTournament().',
      );
    }

    if (requestParameters["tournamentId"] == null) {
      throw new runtime.RequiredError(
        "tournamentId",
        'Required parameter "tournamentId" was null or undefined when calling patchOrganizationTournament().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration?.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}/tournaments/{tournament_id}`
          .replace(`{${"org_id"}}`, encodeURIComponent(String(requestParameters["orgId"])))
          .replace(`{${"tournament_id"}}`, encodeURIComponent(String(requestParameters["tournamentId"]))),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: TournamentDetailsToJSON(requestParameters["tournamentDetails"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TournamentDetailsFromJSON(jsonValue));
  }

  /**
   * Updates an existing tournament for a given organization.
   * Update Tournament
   */
  async patchOrganizationTournament(
    orgId: number,
    tournamentId: number,
    tournamentDetails?: TournamentDetails,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TournamentDetails> {
    const response = await this.patchOrganizationTournamentRaw(
      { orgId: orgId, tournamentId: tournamentId, tournamentDetails: tournamentDetails },
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Creates a new organization.
   * Create Organization
   */
  async postOrganizationRaw(
    requestParameters: PostOrganizationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Organization>> {
    if (requestParameters["organization"] == null) {
      throw new runtime.RequiredError(
        "organization",
        'Required parameter "organization" was null or undefined when calling postOrganization().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration?.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/organizations`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: OrganizationToJSON(requestParameters["organization"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrganizationFromJSON(jsonValue));
  }

  /**
   * Creates a new organization.
   * Create Organization
   */
  async postOrganization(
    organization: Organization,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Organization> {
    const response = await this.postOrganizationRaw({ organization: organization }, initOverrides);
    return await response.value();
  }

  /**
   * Creates a new tournament for a given organization.
   * Create Tournament
   */
  async postOrganizationTournamentRaw(
    requestParameters: PostOrganizationTournamentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TournamentDetails>> {
    if (requestParameters["orgId"] == null) {
      throw new runtime.RequiredError(
        "orgId",
        'Required parameter "orgId" was null or undefined when calling postOrganizationTournament().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration?.apiKey) {
      headerParameters["Authorization"] = await this.configuration.apiKey("Authorization"); // Bearer authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/organizations/{org_id}/tournaments`.replace(
          `{${"org_id"}}`,
          encodeURIComponent(String(requestParameters["orgId"])),
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: TournamentDetailsToJSON(requestParameters["tournamentDetails"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TournamentDetailsFromJSON(jsonValue));
  }

  /**
   * Creates a new tournament for a given organization.
   * Create Tournament
   */
  async postOrganizationTournament(
    orgId: number,
    tournamentDetails?: TournamentDetails,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TournamentDetails> {
    const response = await this.postOrganizationTournamentRaw(
      { orgId: orgId, tournamentDetails: tournamentDetails },
      initOverrides,
    );
    return await response.value();
  }
}
