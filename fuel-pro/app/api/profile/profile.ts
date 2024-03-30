// Import necessary modules and types
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient({ log: ['query'] });

// Define the main async function to handle incoming requests
async function main(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Extract profile data from the request body
        const { profile: profileData } = req.body;

        // Check if the username already exists
        const existingProfile = await prisma.user.findUnique({
            where: {
                username: profileData.clientUsername,
            },
        });

        // If username already exists, return error
        if (existingProfile) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new profile entry in the database
        const createdProfile = await prisma.profile.create({
            data: {
                clientUsername: profileData.clientUsername,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                address1: profileData.address1,
                address2: profileData.address2,
                city: profileData.city,
                state: profileData.state,
                zipcode: profileData.zip,
            },
        });

        // Send a success response with the created profile data
        res.status(201).json(createdProfile);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error saving profile to database:', error);
        res.status(500).json({ error: 'Unable to save profile to database' });
    } finally {
        // Disconnect PrismaClient after database operation
        await prisma.$disconnect();
    }
}

// Export the main function as the default handler for the API route
export default main;
