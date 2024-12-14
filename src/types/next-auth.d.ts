// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string; // Add accessToken to the User type
  }

  interface Session {
    accessToken?: string; // Extend the Session type with accessToken
  }

  interface JWT {
    accessToken?: string;
  }
}
