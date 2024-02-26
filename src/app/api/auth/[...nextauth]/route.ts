import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const AuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Login',
            credentials: {
                email: { label: "email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(creds, req) {
                const user = { id: "1", password: "test", email: "email@example.com" };
                const isCorrectCreds = user.email === creds?.email && user.password === creds?.password;
                if (isCorrectCreds) {
                    return user;
                } else {
                    return null;
                }
            },
        })
    ],
    session: {
        maxAge: 60*60,
        
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.id = token.id;
            return session;
        }
    },
    pages:{
        signIn:'/'
    }
};
const handler = NextAuth(AuthOptions as any)

export { handler as GET, handler as POST };

