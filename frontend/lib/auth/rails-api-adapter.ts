import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters"

import { BattleStadiumAPIClient } from "@/lib/battle-stadium-api";

import { GetUserRequest, PatchUserRequest, RegisterUserRequest, ResponseError, UserDetails } from '@/lib/api';


function catchError(error: unknown): null {
  if ((error as ResponseError).response.status === 404) {
    return null;
  }
  throw error
}

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


export function RailsAdapter (apiClient: BattleStadiumAPIClient): Adapter {
  return {
    async createUser (user) {
      console.log('Creating user', user);
      const registerUserRequest: RegisterUserRequest = {
        email: user.email,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        password: user.password as string,
        passwordConfirmation: user.passwordConfirmation as string,
      }

      try {
        const createdUser = await apiClient.Registration.register({ registerUserRequest });

        return {
          id: createdUser.id,
          email: createdUser.email,
          emailVerified: null,
          name: createdUser.name,
        }
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      }
    },

    async getUser(id) {
      console.log('Getting user', id);
      try {
          const user = await apiClient.Users.get({ id });
        return userAdapter(user);
      } catch (error) {
        console.error('Error creating user:', error)
        return null;
      }
    },

    async getUserByEmail(email) {
      console.log('Getting user by email', email);
      try {
        const user = await apiClient.Users.getByEmail( email );
        return userAdapter(user);
      } catch (error) {
        return catchError(error);
      }
    },

    async getUserByAccount ({ providerAccountId, provider }) {
      try {
        const user = await apiClient.Users.getUserByProvider({} as GetUserRequest)
        return userAdapter(user);
      } catch (error) {
        return catchError(error);
      }
    },

    async updateUser (user) {
      console.log('Updating user', user);
      const patchRequestParams: PatchUserRequest = {
        id: user.id,
      }

      try {
        const updatedUser = await apiClient.Users.patch({ ...patchRequestParams })
        return {
          id: updatedUser.id.toString(),
          email: updatedUser.email,
          emailVerified: null,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          pronouns: updatedUser.pronouns,
          username: updatedUser.username,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`
        }
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    },

    async deleteUser (id) {
      console.log('Deleting user', id);
      try {
        await apiClient.Users.delete({ id })
      } catch (error) {
        console.error('Error deleting user:', error)
        throw error
      }
    },

    async linkAccount (account) {
      console.log('Linking account', account);
      try {
        const user = await apiClient.Users.linkAccount({
          userId: parseInt(account.userId),
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          // Add other relevant fields
        } as unknown as GetUserRequest)

        const adapterAccount: AdapterAccount = {
          userId: user.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        }

        return adapterAccount;
      } catch (error) {
        console.error('Error linking account:', error)
        throw error
      }
    },

    async unlinkAccount ({ providerAccountId, provider }) {
      console.log('Unlinking account', providerAccountId, provider);
      try {
        await apiClient.Users.unlinkAccount({ provider, providerAccountId }as unknown as GetUserRequest)
      } catch (error) {
        console.error('Error unlinking account:', error)
        throw error
      }
    },

    async createSession ({ sessionToken, userId, expires }) {
      console.log('Creating session', sessionToken, userId, expires);
      try {
        console.log('Creating session', sessionToken, userId, expires);

        const session = await apiClient.Session.create({ userLoginRequest: { email: '', password: '' } });

        const adapterSession: AdapterSession = {
          sessionToken: session.token,
          userId: session.id,
          expires: new Date(), // Add expires
        }
        return adapterSession;
      } catch (error) {
        console.error('Error creating session:', error)
        throw error
      }
    },

    async getSessionAndUser (sessionToken) {
      console.log('Getting session and user', sessionToken);
      try {
        const { session, user } = await apiClient.Session.getSessionAndUser(sessionToken)

        if (!session || !user) return null;

        return {
          session: {
            sessionToken: session.sessionToken,
            userId: session.userId,
            expires: new Date(session.expires),
          },
          user: {
            id: user.id.toString(),
            email: user.email,
            emailVerified: null,
            name: user.name,
            emailVerified: user.emailVerified,
          },
        }
      } catch (error) {
        return catchError(error);
      }
    },

    async updateSession ({ sessionToken, expires, userId }) {
      console.log('Updating session', sessionToken, expires, userId);
      try {
        const updatedSession = await apiClient.Session.update({
          sessionToken,
          sessionUpdateParams: {
            expires: expires?.toISOString(),
            userId: userId ? parseInt(userId) : undefined,
          },
        } as unknown as RequestInit)
        return {
          sessionToken: updatedSession.sessionToken,
          userId: updatedSession.userId.toString(),
          expires: new Date(updatedSession.expires),
        }
      } catch (error) {
        console.error('Error updating session:', error)
        throw error
      }
    },

    async deleteSession (sessionToken) {
      console.log('Deleting session', sessionToken);
      try {
        await apiClient.Session.delete({ sessionToken } as unknown as RequestInit)
      } catch (error) {
        console.error('Error deleting session:', error)
        throw error
      }
    },

    // Implement verifyToken, setVerifyToken, and useVerificationToken if needed for email verification
  }
}
