import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Admin 아이디" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const res = await fetch("http://localhost:3000/api/v1/admin", {
          method: "POST",
          body: JSON.stringify({ id: email, pw: password }),
        });
        const data = await res.json();
        if (res.status !== 200) {
          return null;
        }
        return data;
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-expect-error: user has uid
        token.uid = user.uid;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, ...token } };
    },
  },
};

export default NextAuth(authOptions);
