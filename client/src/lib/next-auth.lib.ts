import { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { login, register } from "@/services/aurh.service";

export const nextAuthOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: {
          type: 'text',
        },
        email: {
          type: 'text',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const { email, password, username } = credentials;
        if (!email || !password) {
          return null;
        }
        if (username) {
          return register(credentials)
        }
        return login(email, password)
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      return { ...token, ...user }
    },
    session({ session, token }) {
      session.user = token as User
      return session
    },
  },
}
