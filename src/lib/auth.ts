// src/lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

export const getAuthOptions = (tenant: string): NextAuthOptions => ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials as any
        if (username && password === '1234') {
          return { id: '1', name: username, tenant }
        }
        return null
      }
    })
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) token.tenant = user.tenant
    //   return token
    // },
    // async session({ session, token }) {
    //   session.tenant = token.tenant
    //   return session
    // }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token-${tenant}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  pages: {
    signIn: `/home/${tenant}/login`
  },
  secret: process.env.NEXTAUTH_SECRET
})
