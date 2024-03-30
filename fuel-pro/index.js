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

app.use(cors({ credentials: true }));
app.use(session(
    {
        secret: 'ayushsarangjosh',
        saveUninitialized: true,
        resave: false,
        cookie: {
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

// Update a user by ID
// app.put('/users/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username, password } = req.body;
//     try {
//         const updatedUser = await prisma.user.update({
//             where: {
//                 id,
//             },
//             data: {
//                 username,
//                 password,
//             },
//         });
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(400).json({ error: 'Bad Request' });
//     }
// });

// Delete a user by ID
// app.delete('/users/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await prisma.user.delete({
//             where: {
//                 id,
//             },
//         });
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.get('/user', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await prisma.user.findMany({
//             // where: {
//             //     username,
//             //     password,
//             // },
//         });
//         if (!user) {
//             console.log("unable")
//             res.status(404).json({ error: 'User not found' });
//         } else {
//             res.json(user);
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/user', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 username: username,
//                 password: password,
//             },
//         });

//         if (!user) {
//             // Return a generic error message for invalid credentials
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         // const passwordMatch = await bcrypt.compare(password, user.password);

//         // if (!passwordMatch) {
//         //     // Return a generic error message for invalid credentials
//         //     return res.status(401).json({ error: 'Invalid username or password' });
//         // }
//         const userInfo = {
//             id: user.id,
//             username: user.username,
//             password: user.password,
//         };
//         // Create JWT token
//         const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h' });


//         req.session.user = {
//             id: user.id,
//             username: user.username,
//             password: user.password,
//             token: token, // Store token in session
//         };
//         console.log(req.session.user);

//         // const token = generateToken(user.id);

//         // Store session token in the database
//         // const session = await prisma.session.update({

//         //     data: {
//         //         token: token,
//         //         user: { connect: { username: user.username } },
//         //     },
//         // });
//         // console.log(secretKey)

//         console.log('Generated token:', token); // Log the generated token

//         res.json({token});
//         // res.json({ user, token, expiresAt });

//         // res.json({ user, session });
//     } catch (error) {
//         console.error('Error during:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

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

        // Log the entire req object for inspection
        // console.log('Req object:', req);

        res.json(req.session.user);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//     // Extract token from Authorization header
//     const authHeader = req.headers['Authorization'] || req.headers['authorization']; // Check for both cases

//     const token = authHeader && authHeader.split(' ')[1];
//     console.log('Extracted Token:', token); // Log the extracted token

//     if (token == null) {
//         // If token is not provided, return unauthorized status
//         return res.sendStatus(401);
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             // If token verification fails, return unauthorized status
//             return res.sendStatus(403);
//         }
//         // If token is valid, set the user object in the request and proceed to next middleware
//         req.user = user;
//         next();
//     });
// };


// POST /api/profile endpoint handler
// app.get('/profile', async (req, res) => {
//     try {
//         // Destructure name and address from the request body
//         const { firstName, lastName, address1, address2, city, state, zip } = req.body;

//         // Check if name and address are provided
//         // if (!clientUsername) {
//         //     return res.status(400).json({ error: 'Name and address are required parameters.' });
//         // }

//         // Retrieve the user's username from the session
//         // const clientUsername = req.session.user.username;

//         // Find the user in the database based on the username
//         const user = await prisma.user.findUnique({
//             where: {
//                 username: req.session.user.username
//             },
//             include: {
//                 profile: true // Include the profile associated with the user
//             }
//         });

//         // If user not found, return a 404 error
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user's profile with the provided name and address
//         const updatedProfile = await prisma.profile.upsert({
//             where: {
//                 clientUsername: req.prisma.user.username
//             },
//             update: {
//                 firstName: firstName,
//                 lastName: lastName,
//                 address1: address1,
//                 address2: address2,
//                 city: city,
//                 state: state,
//                 zipcode: zip
//             },
//             create: {
//                 clientUsername: username,
//                 firstName: firstName,
//                 lastName: lastName,
//                 address1: address1,
//                 address2: address2,
//                 city: city,
//                 state: state,
//                 zipcode: zip
//             }
//         });

//         // Return the updated profile and indicate successful login
//         res.json({ loggedIn: true, user: req.session.user, profile: updatedProfile });
//     } catch (error) {
//         // Handle errors
//         console.error('Error updating profile:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/profile', async (req, res) => {
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
        console.log('Session profile:', user);

        // If user not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch user profile based on the retrieved user data
        const profile = await prisma.profile.findUnique({
            where: {
                clientUsername: username
            }
        });

        // If profile not found, return a 404 error
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        console.log('Session profile:', profile);

        // Return the user profile
        res.json({ user: userSession.user, profile: profile });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







// app.post('/profile', async (req, res) => {
//     const { firstName, lastName, address1, address2, city, state, zip } = req.body.profile;

//     try {
//         // Assuming the user is already authenticated, we can get the username from the session or token
//         const username = req.user.username; // Adjust this according to your authentication mechanism

//         // Check if the user profile already exists

//         // Create a new user profile
//         const newProfile = await prisma.profile.update({
//             where: {
//                 clientUsername: username,
//             },
//             data: {
//                 firstName: firstName,
//                 lastName: lastName,
//                 address1: address1,
//                 address2: address2,
//                 city: city,
//                 state: state,
//                 zipcode: zip
//             }
//         });

//         res.json(newProfile);
//     }
//     catch (error) {
//         console.error('Error saving profile:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Import the jsonwebtoken package

// app.post('/profile', async (req, res) => {
//     try {
//         // Retrieve the token from the request headers
//         const authorizationHeader = req.headers.authorization;

//         // Check if the authorization header exists
//         if (!authorizationHeader) {
//             return res.status(401).json({ error: 'Authorization header is missing' });
//         }

//         // Split the authorization header to extract the token
//         const token = authorizationHeader.split(' ')[1];

//         // Verify and decode the token
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//         // Extract the user information from the decoded token
//         const userId = decodedToken.id;
//         const username = decodedToken.username;

//         // Use the user information to fetch the profile
//         const profile = await prisma.profile.findUnique({
//             where: {
//                 username: username,
//             },
//         });

//         if (!profile) {
//             return res.status(404).json({ error: 'Profile not found' });
//         }

//         res.json(profile);
//     } catch (error) {
//         console.error('Error fetching profile:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/quote', async (req, res) => {
    try {
        // Retrieve the user's username from the session
        const userSession = req.session.user;

        if (!userSession) {
            return res.status(401).json({ error: 'User session not found' });
        }

        const username = userSession.username;

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
        res.json({ user: user, quotes: quotes });
    } catch (error) {
        console.error('Error fetching user quotes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
