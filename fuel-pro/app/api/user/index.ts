// Import necessary modules and types
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient({ log: ['query'] });

// Define the main async function to handle incoming requests
async function main(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Extract username and password from the request body
        if (req.method === 'POST') {
        const { username, password } = req.body;
        console.log("Ayush");
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });


        if (!user) {
            // If user does not exist, send a response indicating user not found
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches
        if (user.password !== password) {
            // If password does not match, send a response indicating invalid credentials
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If user exists and password matches, send a success response
        res.status(200).json({ message: 'Login successful', user });
    }
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    } finally {
        // Disconnect PrismaClient after database operation
        await prisma.$disconnect();
    }
}

// Export the main function as the default handler for the API route
export default main;

