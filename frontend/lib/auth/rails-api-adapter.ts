import type { Adapter, AdapterUser } from "next-auth/adapters";

import { BattleStadiumAPIClient, GetUserRequest, RegisterUserRequest, UserDetails } from "@/lib/api";

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
    },

    async getUser(id) {
      const user = await apiClient.Users.get(id);

      return userAdapter(user);
    },

    async getUserByEmail(email) {
      const user = await apiClient.Users.getByEmail(email);

      return userAdapter(user);
    },

    async getUserByAccount() {
      const user = await apiClient.Users.getUserByProvider({} as GetUserRequest);

      return userAdapter(user);
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
    },

    async deleteUser(id) {
      await apiClient.Users.delete(id);
    },

    async linkAccount(account) {
      const user = await apiClient.Users.linkAccount({
        userId: parseInt(account.userId),
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        // Add other relevant fields
      } as unknown as GetUserRequest);

      return {
        userId: user.id,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      };
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await apiClient.Users.unlinkAccount({ provider, providerAccountId } as unknown as GetUserRequest);
    },

    async createSession({ userId }) {
      const newSession = await apiClient.Session.create({ userId });

      return {
        sessionToken: newSession.token,
        userId: newSession.userId,
        expires: newSession.expiresAt,
      };
    },

    async getSessionAndUser(sessionToken) {
      const { session, user } = await apiClient.Session.get(authorizationHeader(sessionToken));

      if (!session || !user) {
        return null;
      }

      return {
        session: {
          username: user.username,
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
    },

    async updateSession({ sessionToken }) {
      const session = await apiClient.Session.update(authorizationHeader(sessionToken));

      return {
        username: session.username,
        sessionToken: session.token,
        userId: session.userId,
        expires: session.expiresAt,
      };
    },

    async deleteSession(sessionToken) {
      await apiClient.Session.delete(authorizationHeader(sessionToken));
    },

    // Implement verifyToken, setVerifyToken, and useVerificationToken if needed for email verification
  };
}
