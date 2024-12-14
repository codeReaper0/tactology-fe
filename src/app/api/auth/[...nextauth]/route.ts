import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {API_URL} from "@/lib/axios";
import axios from "axios";

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

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        try {
          // GraphQL mutation to log in the user
          const query = `
            mutation Login($loginInput: LoginUserInput!) {
              login(loginUserDto: $loginInput) {
                accessToken
                user {
                  id
                  email
                  name
                }
              }
            }
          `;

          const variables = {
            loginInput: {
              email,
              password,
            },
          };

          // Send the API request
          const response = await axios.post(API_URL, {
            query,
            variables,
          });

          const data = response.data?.data?.login;

          if (!data) {
            throw new Error("Invalid login response from server.");
          }
          console.log(response);
          // Return user data and accessToken
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Error during login:", error);
          throw new Error("Invalid email or password.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      // Add accessToken to the token if it's a new login
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({session, token}) {
      // Add accessToken from the token to the session
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
});

export {handler as GET, handler as POST};
