import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from "./db";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import NextAuth from 'next-auth';
import Providers from 'next-auth';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        EmailProvider({
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
            },
            from: process.env.EMAIL_FROM
          }),
          
        
    ],

} satisfies NextAuthOptions

// Ensure that prisma is connected to the database
async function main() {
  await prisma.$connect();
}

// Call the main function to ensure prisma is connected when the module is loaded
main().catch((err) => {
  console.error('Failed to connect to Prisma:', err);
});