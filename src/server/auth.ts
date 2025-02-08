import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
      session: ({ session, token }) => {
          // console.log('callbacks_session', session, token)
          return ({
              ...session,
              user: {
                  ...session.user,
                  // id: user?.id,
              },
          })
      },
  },
  session: {
      strategy: "jwt",
  },
//   pages: {
//       signIn: '/auth/login',
//   },
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
      CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
              username: {label: "Username", type: "text", placeholder: "name"},
              password: {label: "Password", type: "password", placeholder: "password"}
          },
          async authorize(credentials, req) {
              // console.log('credentials', credentials);
              // Add logic here to look up the user from the credentials supplied
              const user = credentials ? await db.user.findFirst({
                  where: {
                      name: credentials.username,
                      password: credentials.password,
                  }
              }) : null

              if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
              } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null

                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
          }
      })
  ],
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
