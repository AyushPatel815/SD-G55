const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const cors = require('cors'); // Import the 'cors' middleware
const jwt = require('jsonwebtoken');

const session = require('express-session');


const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request bodies
app.use(express.json());
const cookieParser = require('cookie-parser');
app.set('trust proxy', 1)

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(session(
    {
        secret: 'ayushsarangjosh',
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false,
            maxAge: parseInt(process.env.SESSION_MAX_AGE),
        },
        secure: false,
    }
));

app.use((req, res, next) => {
    // console.log(req.session);
    next();
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Origin', 'Content-Type');
//     next();
// });

// Get all users
// Handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: "Ayush",
            },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/user', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
                password: password,
            }
        });

        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        req.session.authenticated = true;
        req.session.loggedIn = true;
        req.session.user = existingUser.username;


        // Await the session save operation
        await req.session.save();

        console.log('Session saved:', req.session);

        // const profile = await prisma.profile.findUnique({
        //     where: {
        //         clientUsername: existingUser.username
        //     }
        // });

        // if (!profile) {
        //     return res.status(404).json({ error: 'Profile not found' });
        // }

        // console.log('User profile:', profile);

        // Log the entire req object for inspection
        // console.log('Req object:', req);

        res.json(req.session.user);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/profile', async (req, res) => {
    try {
        // Retrieve the user's username from the session
        const userSession = req.session;

        if (!userSession || !userSession.user) {
            return res.status(401).json({ error: 'User session not found' });
        }

        const username = userSession.user;
        const { firstName, lastName, address1, address2, city, state, zip } = req.body;

        // Find the user's profile in the database based on the username
        let existingProfile = await prisma.profile.findUnique({
            where: {
                clientUsername: username
            }
        });

        // If profile not found, create a new profile
        if (!existingProfile) {
            existingProfile = await prisma.profile.create({
                data: {
                    clientUsername: username,
                    firstName: firstName,
                    lastName: lastName,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zipcode: zip
                }
            });
        } else {
            // Update the existing profile with the provided data
            existingProfile = await prisma.profile.update({
                where: {
                    clientUsername: username
                },
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zipcode: zip
                }
            });
        }

        res.json({ user: userSession.user, profile: existingProfile });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
        });

        // Save the session
        req.session.authenticated = true;
        req.session.signedUp = true;
        req.session.user = newUser.username,

        await req.session.save();

        console.log('New user created:', newUser);

        res.json(req.session.user); // Sending response here

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/quote', async (req, res) => {
    try {
        // Retrieve the user's username from the session
        const userSession = req.session;
        console.log(userSession)

        if (!userSession || !userSession.user) {
            return res.status(401).json({ error: 'User session not found' });
        }
        const username = userSession.user;


        // Find the user in the database based on the username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        // If user not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch quotes associated with the user
        const quotes = await prisma.quote.findMany({
            where: {
                clientUsername: username
            }
        });

        // If quotes not found, return a 404 error
        if (!quotes || quotes.length === 0) {
            return res.status(404).json({ error: 'Quotes not found for this user' });
        }

        // Return the user's quotes
        res.json({ user: userSession.user, quotes: quotes });
    } catch (error) {
        console.error('Error fetching user quotes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/fuel-quote', async (req, res) => {
    try {
        // Retrieve the user's username from the session
        const { requestedGallons, date } = req.body;
        const userSession = req.session;
        if (!userSession || !userSession.user) {
            return res.status(401).json({ error: 'User session not found' });
        }
        const clientUsername = userSession.user;

        // Retrieve profile based on clientUsername
        const profile = await prisma.profile.findUnique({
            where: {
                clientUsername: clientUsername
            }
        });

        // If profile not found, return an error
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        let address = profile.address1;
        if (profile.address2) {
            address += `, ${profile.address2}`;
        }

        console.log('Requested Gallons:', requestedGallons); // Check requested gallons

        // Convert requestedGallons to integer
        const gallons = parseInt(requestedGallons);

        // Create the fuel quote in the database
        const newQuote = await prisma.quote.create({
            data: {
                clientUsername: clientUsername,
                date: new Date(date),
                gallons: gallons,
                address: address,
                city: profile.city,
                state: profile.state,
                zipcode: profile.zipcode
            }
        });

        console.log('New Quote:', newQuote); // Log new quote object

        res.status(201).json({ user: clientUsername, quote: newQuote });
    } catch (error) {
        console.error('Error creating fuel quote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
