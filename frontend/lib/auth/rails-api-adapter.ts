import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters";

import { BattleStadiumAPIClient } from "@/lib/battle-stadium-api";
import { GetUserRequest, PatchUserRequest, RegisterUserRequest, ResponseError, UserDetails } from "@/lib/api";
import { auth } from "@/auth";

function userAdapter(user: UserDetails): AdapterUser {
  const adapterUser: AdapterUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    pronouns: user.pronouns,
    username: user.username,
    name: `${user.firstName} ${user.lastName}`,
    emailVerified: user.emailVerified ?? null,
  };

  return adapterUser;
}

function authorizationHeader(sessionToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }
}

export function RailsAdapter(apiClient: BattleStadiumAPIClient): Adapter {
  return {
    async createUser(user) {
      const registerUserRequest: RegisterUserRequest = {
        email: user.email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        password: user.password as string,
        passwordConfirmation: user.passwordConfirmation as string,
      };

      try {
        const createdUser = await apiClient.Registration.register( registerUserRequest );

        return {
          id: createdUser.id,
          email: createdUser.email,
          emailVerified: createdUser.emailVerified ?? null,
          name: createdUser.name,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          pronouns: createdUser.pronouns,
          username: createdUser.username,
        };
      } catch (error) {
        console.error("createUser error", error);
        throw error;
      }
    },

    async getUser(id) {
      try {
        const user = await apiClient.Users.get( id );

        return userAdapter(user);
      } catch (error) {
        if ((error as ResponseError).response.status === 404) {
          return null;
        }
        throw error;
      }
    },

    async getUserByEmail(email) {
      try {
        const user = await apiClient.Users.getByEmail(email);

        return userAdapter(user);
      } catch (error) {
        if ((error as ResponseError).response.status === 404) {
          return null;
        }
        throw error;
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const user = await apiClient.Users.getUserByProvider({} as GetUserRequest);

        return userAdapter(user);
      } catch (error) {
        if ((error as ResponseError).response.status === 404) {
          return null;
        }
        throw error;
      }
    },

    async updateUser(user) {

      const userDetails: UserDetails = {
        id: user.id,
        email: user.email ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        pronouns: user.pronouns ?? "",
        username: user.username ?? "",
      };

      try {
        const updatedUser = await apiClient.Users.patch(user.id, userDetails);

        return {
          id: updatedUser.id.toString(),
          email: updatedUser.email,
          emailVerified: null,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          pronouns: updatedUser.pronouns,
          username: updatedUser.username,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        };
      } catch (error) {
        console.error("updateUser error", error);
        throw error;
      }
    },

    async deleteUser(id) {
      try {
        await apiClient.Users.delete( id );
      } catch (error) {
        console.error("deleteUser error", error);
        throw error;
      }
    },

    async linkAccount(account) {
      try {
        const user = await apiClient.Users.linkAccount({
          userId: parseInt(account.userId),
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          // Add other relevant fields
        } as unknown as GetUserRequest);

        const adapterAccount: AdapterAccount = {
          userId: user.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        };

        return adapterAccount;
      } catch (error) {
        console.error("linkAccount error", error);
        throw error;
      }
    },

    async unlinkAccount({ providerAccountId, provider }) {
      try {
        await apiClient.Users.unlinkAccount({ provider, providerAccountId } as unknown as GetUserRequest);
      } catch (error) {
        console.error("unlinkAccount error", error);
        throw error;
      }
    },

    async createSession({ sessionToken, userId, expires }) {
      try {
        const session = await apiClient.Session.create({ email: "", password: "" });

        const adapterSession: AdapterSession = {
          sessionToken: session.token,
          userId: session.id,
          expires: new Date(), // Add expires
        };

        return adapterSession;
      } catch (error) {
        console.error("createSession error", error);
        throw error;
      }
    },

    async getSessionAndUser(sessionToken) {
      try {
        const { session, user } = await apiClient.Session.get(authorizationHeader(sessionToken));

        if (!session || !user) {
          return null;
        }

        return {
          session: {
            sessionToken: session.token,
            userId: session.userId,
            expires: session.expiresAt,
          },
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            pronouns: user.pronouns,
            emailVerified: user.emailVerified ?? null,
          },
        };
      } catch (error) {
        if ((error as ResponseError)?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },

    async updateSession({ sessionToken, expires, userId }) {
      console.log("updateSession", sessionToken, expires, userId);
      try {

        const session= await apiClient.Session.update(authorizationHeader(sessionToken));

        return {
          sessionToken: session.token,
          userId: session.userId,
          expires: session.expiresAt,
        };
      } catch (error) {
        console.error("updateSession error", error);
        throw error;
      }
    },

    async deleteSession(sessionToken) {
      try {
        await apiClient.Session.delete({ sessionToken } as unknown as RequestInit);
      } catch (error) {
        console.error("deleteSession error", error);
        throw error;
      }
    },

    // Implement verifyToken, setVerifyToken, and useVerificationToken if needed for email verification
  };
}