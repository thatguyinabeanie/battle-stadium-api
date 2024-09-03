import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters";

import { BattleStadiumAPIClient } from "@/lib/api";
import { GetUserRequest, RegisterUserRequest, ResponseError, UserDetails } from "@/lib/api";

function userAdapter(user: UserDetails): AdapterUser {
  const adapterUser: AdapterUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    pronouns: user.pronouns,
    username: user.username,
    name: `${user.firstName} ${user.lastName}`,
    emailVerified: user.emailVerifiedAt ?? null,
  };

  return adapterUser;
}

function authorizationHeader(sessionToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  };
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
        const createdUser = await apiClient.Registration.register(registerUserRequest);

        return {
          id: createdUser.id,
          email: createdUser.email,
          emailVerified: createdUser.emailVerifiedAt ?? null,
          name: createdUser.name,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          pronouns: createdUser.pronouns,
          username: createdUser.username,
        };
      } catch (error) {
        throw error;
      }
    },

    async getUser(id) {
      try {
        const user = await apiClient.Users.get(id);

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

    async getUserByAccount() {
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
        emailVerifiedAt: user.emailVerified ?? null,
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
        throw error;
      }
    },

    async deleteUser(id) {
      try {
        await apiClient.Users.delete(id);
      } catch (error) {
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
        throw error;
      }
    },

    async unlinkAccount({ providerAccountId, provider }) {
      try {
        await apiClient.Users.unlinkAccount({ provider, providerAccountId } as unknown as GetUserRequest);
      } catch (error) {
        throw error;
      }
    },

    async createSession({ userId }) {
      try {
        const newSession = await apiClient.Session.create({ userId });

        const adapterSession: AdapterSession = {
          sessionToken: newSession.token,
          userId: newSession.userId,
          expires: newSession.expiresAt,
        };

        return adapterSession;
      } catch (error) {
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
            emailVerified: user.emailVerifiedAt ?? null,
          },
        };
      } catch (error) {
        if ((error as ResponseError)?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },

    async updateSession({ sessionToken }) {
      try {
        const session = await apiClient.Session.update(authorizationHeader(sessionToken));

        return {
          sessionToken: session.token,
          userId: session.userId,
          expires: session.expiresAt,
        };
      } catch (error) {
        throw error;
      }
    },

    async deleteSession(sessionToken) {
      try {
        await apiClient.Session.delete(authorizationHeader(sessionToken));
      } catch (error) {
        throw error;
      }
    },

    // Implement verifyToken, setVerifyToken, and useVerificationToken if needed for email verification
  };
}
