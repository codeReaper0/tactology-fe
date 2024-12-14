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
          const query = `
			query Login($loginUserDto: LoginUserDto!) {
			  loginUser(loginUserDto: $loginUserDto) {
				accessToken
			  }
			}
		  `;

          const variables = {
            loginUserDto: {
              email,
              password,
            },
          };

          const response = await axios.post(
            API_URL,
            {
              query,
              variables,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data?.data?.loginUser.accessToken;

          if (!data) {
            throw new Error(
              response.data?.errors?.[0]?.message ||
                "Unknown error during login"
            );
          }

          return {
            id: "0",
            email: email,
            name: "",
            accessToken: data,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error?.message);
          throw new Error(error?.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  pages: {
    error: "/login", // Custom error page
    signIn: "/login", // Custom sign-in page
  },
});

export {handler as GET, handler as POST};
