/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const emailLogin = "test@example.com";
const passwordLogin = "password";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (email === emailLogin && password === passwordLogin) {
          return {
            id: "1", // Ensure the id is a string
            email: email,
            name: "test user",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  callbacks: {
    async jwt({token}) {
      return token;
    },
    async session({session}) {
      return session;
    },
  },
});

export {handler as GET, handler as POST};
