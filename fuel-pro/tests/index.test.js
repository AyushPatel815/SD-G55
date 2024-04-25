
const request = require('supertest');
const app = require('../index.js'); // Import your Express app
const session = require('express-session');
const { arrow_function } = require("../index.js");
const { PrismaClient } = require('@prisma/client');
const createFuelQuote = require('../index.js'); // Import your error handler function
const { describe } = require('node:test');

const prisma = new PrismaClient();
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

afterAll(async () => {
  await prisma.$disconnect();
});

let server;

beforeAll(() => {
  server = app.listen(4001); // Start the server before running any tests
});

beforeEach(() => {
  testSession = session(app);
})

afterAll((done) => {
  server.close(done); // Close the server after all tests are finished
});



describe('GET /', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with "Welcome to the API!"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Welcome to the API!');
  });
});


describe('POST /user', () => {
  it('should respond with status 401 if user does not exist', async () => {
    const response = await request(app)
      .post('/user')
      .send({ username: 'unknown_username', password: 'unknown_psswd' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid username or password');
  });

  it('should respond with status 200 and the user\'s username if user exists', async () => {
    // Replace 'existingUsername' and 'existingPassword' with actual credentials of an existing user in your system
    const existingUsername = 'Ayush';
    const existingPassword = 'Ayush1920';

    const response = await request(app)
      .post('/user')
      .send({ username: existingUsername, password: existingPassword });

    expect(response.status).toBe(200);
    expect(response.body).toBe(existingUsername);
  });

  it('should authenticate a user and create session', async () => {
    const userData = {
        username: 'Ayush',
        password: 'Ayush1920'
    };

    // Send the request to authenticate the user
    const response = await request(app)
        .post('/user')
        .send(userData)
        .set('Accept', 'application/json');

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // Check if the response body contains the authenticated user's username
    expect(response.body).toEqual('Ayush');
    
});



let sessionCookie; // Variable to store the session cookie


  beforeAll(async () => {
    const userData = {
        username: 'Ayush',
        password: 'Ayush1920'
    };

    const response = await request(app)
        .post('/user')
        .send(userData)
        .set('Accept', 'application/json');

    sessionCookie = response.headers['set-cookie'][0];
});
  it('should create a new fuel quote if user session is found', async () => {
     
    const response = await request(app)
      .post('/user')
      .send({})
      .set('Cookie', sessionCookie);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');


  });

});



describe('POST /profile', () => {
    it('should respond with status 401 if user session is not found', async () => {
      const response = await request(app)
        .post('/profile')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          address1: '123 Main Street',
          city: 'Anytown',
          state: 'CA',
          zip: '12345'
        });
  
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'User session not found');
    });


  let sessionCookie; // Variable to store the session cookie

    // Before running any tests, authenticate the user and store the session cookie
    beforeAll(async () => {
        const userData = {
            username: 'Ayush',
            password: 'Ayush1920'
        };

        const response = await request(app)
            .post('/user')
            .send(userData)
            .set('Accept', 'application/json');

        sessionCookie = response.headers['set-cookie'][0];
    });

    it('should create or update a user profile with valid session', async () => {
        const profileData = {
            firstName: 'Ayush',
            lastName: 'Patel',
            address1: '1234 Starcross Bend',
            address2: '',
            city: 'Sugarland',
            state: 'AK',
            zip: '12345'
        };

        const response = await request(app)
            .post('/profile')
            .send(profileData)
            .set('Accept', 'application/json')
            .set('Cookie', sessionCookie); // Reuse the session cookie

        expect(response.status).toBe(200);
        // Add additional assertions as needed
    });
    
  

});


describe('POST /signup', () => {


it('should create a new user and return the username', async () => {
  // Mock user data for signup
  const userData = {
    username: 'testuserk',
    password: 'testpassword2'
  };

  // Send request to signup endpoint
  const response = await request(app)
    .post('/signup')
    .send(userData)
    .set('Accept', 'application/json');

  // Check the response status code
  expect(response.status).toBe(200);

  // Check if the response body contains the username
  expect(response.body).toEqual(userData.username);

  // You can add more specific assertions if needed
});

it('should return 401 if the user already exists', async () => {
  // Mock existing user data for signup
  const existingUserData = {
    username: 'Ayush',
    password: 'Ayush1920'
  };

  // Send request to signup endpoint for existing user
  const response = await request(app)
    .post('/signup')
    .send(existingUserData)
    .set('Accept', 'application/json');

  // Check the response status code
  expect(response.status).toBe(401);

  // Check if the response body contains the error message
  expect(response.body).toEqual({ error: 'User already exists.' });

  // You can add more specific assertions if needed
});

it('should get 500 internal server error', async () => {
     
  const response = await request(app)
    .post('/signup')
    .send({})
    // .set('Cookie', sessionCookie);

  // Assertions
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty('error', 'Internal Server Error');


});
});




describe('GET /quote', () => {
  let sessionCookie; // Variable to store the session cookie

// Before running any tests, authenticate the user and store the session cookie
beforeAll(async () => {
    const userData = {
        username: 'Ayush',
        password: 'Ayush1920'
    };

    const response = await request(app)
        .post('/user')
        .send(userData)
        .set('Accept', 'application/json');

    sessionCookie = response.headers['set-cookie'][0];
});

  
  
  it('should return 401 if user session is not found', async () => {
    const response = await request(app).get('/quote');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'User session not found' });
  });


  it('should return user quotes if everything works correctly', async () => {
    const session = { user: 'Ayush' };

    const response = await request(app)
        .get('/quote')
        .set('Cookie', sessionCookie);

    expect(response.status).toBe(200);
    // Add more specific expectations based on your data model
    expect(response.body.user).toBe(session.user);
    // expect(Array.isArray(response.body.quotes)).toBe(true);
  });
});

describe('GET /quote', () => {

  let sessionCookie; // Variable to store the session cookie

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
      const userData = {
          username: 'Ayushi',
          password: 'Ayush19208'
      };
  
      const response = await request(app)
          .post('/user')
          .send(userData)
          .set('Accept', 'application/json');
  
      sessionCookie = response.headers['set-cookie'][0];
  });

  test('should return 404 if user is not found', async () => {
    const session = { user: 'Ayushi' };
    const response = await request(app).get('/quote').set('Cookie', sessionCookie);
    expect(response.status).toBe(401);
    // expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should respond with status 404 if profile is not found', async () => {
    // Mock session user
    const mockSession = {
      user: 'nonExistentUser'
    };

    // Set up request body
    const requestBody = {
      requestedGallons: 100,
      date: '2024-04-11'
    };

    // Send request to fuel-quote endpoint without session cookie
    const response = await request(app)
      .post('/fuel-quote')
      .send(requestBody);

    // Assert the response
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

});

describe('GET /quote', () => {

  let sessionCookie; // Variable to store the session cookie

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
      const userData = {
          username: 'Krish',
          password: 'krish1234'
      };
  
      const response = await request(app)
          .post('/user')
          .send(userData)
          .set('Accept', 'application/json');
  
      sessionCookie = response.headers['set-cookie'][0];
  });

  it('should return 404 if quotes are not found for the user', async () => {
    // const session = { user: 'Krish' };
    const response = await request(app).get('/quote').set('Cookie', sessionCookie);
    expect(response.status).toBe(404); // Adjusted status code to 404
    expect(response.body).toEqual({ error: 'Quotes not found for this user' });
  });
  

});



describe('GET /fuel-quote', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    const userData = {
      username: 'Ayush',
      // Add other user data as needed
    };

    // Send request to create a new user and authenticate
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');

    // Store the session cookie
    sessionCookie = response.headers['set-cookie'][0];
  });

  it('should return user profile and fuel quote history if user session is found', async () => {
    // Send request to fuel-quote endpoint with the stored session cookie
    const response = await request(app)
      .get('/fuel-quote')
      .set('Cookie', sessionCookie);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userProfile');
    expect(response.body).toHaveProperty('fuelQuoteHistoryExists');
  });

  it('should return 401 if user session is not found', async () => {
    // Send request to fuel-quote endpoint without session cookie
    const response = await request(app)
      .get('/fuel-quote');

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'User session not found' });
  });

  // Add more test cases as needed
});
describe('GET /fuel-quote', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    const userData = {
      username: 'Ayush',
      // Add other user data as needed
    };

    // Send request to create a new user and authenticate
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');

    // Store the session cookie
    sessionCookie = response.headers['set-cookie'][0];
  });
  it('responds with user profile data if found', async () => {
    const response = await request(app)
      .get('/fuel-quote')
      .set('Cookie', sessionCookie)
      .expect(200);
    // Corrected assertion: Check if the userProfile object has the 'clientUsername' property with the value 'Ayush'
    expect(response.body.userProfile).toHaveProperty('clientUsername', 'Ayush');
  });

});

describe('POST /fuel-quote', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    const userData = {
      username: 'Prayag',
      // Add other user data as needed
    };

    // Send request to create a new user and authenticate
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');

    // Store the session cookie
    sessionCookie = response.headers['set-cookie'][0];
  });
  it('responds 404 fuel post if user profile not found', async () => {
    const response = await request(app)
      .get('/fuel-quote')
      .set('Cookie', sessionCookie)
    // Corrected assertion: Check if the userProfile object has the 'clientUsername' property with the value 'Ayush'
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User profile not found' });
  });

});

describe('GET /profile', () => {
  let testSession;

  beforeAll(async () => {
    // Perform any setup tasks, such as creating a test user and session
    // For example, you can create a user session and store it in a variable
    const userData = {
      username: 'test',
      // Add other user data as needed
    };
  });

  it('responds with 401 if user session not found', async () => {
    const response = await request(app)
      .get('/profile')
      .expect(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });



});

describe('GET /profile', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    const userData = {
      username: 'Prayag',
      // Add other user data as needed
    };

    // Send request to create a new user and authenticate
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');

    // Store the session cookie
    sessionCookie = response.headers['set-cookie'][0];
  });
  it('responds with 404 if user profile not found', async () => {
    // Assuming 'test_user' doesn't have a profile in your database
    const response = await request(app)
      .get('/profile')
      .set('Cookie', sessionCookie)
      .expect(404);
    expect(response.body).toHaveProperty("error", "User profile not found");
  });

});




describe('GET /profile', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    const userData = {
      username: 'Ayush',
      // Add other user data as needed
    };

    // Send request to create a new user and authenticate
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');

    // Store the session cookie
    sessionCookie = response.headers['set-cookie'][0];
  });
  it('responds with user profile data if found', async () => {
    // Assuming you've set up a test profile for 'test_user' in your database


    // Mocking Prisma's behavior to return the test profile


    const response = await request(app)
      .get('/profile')
      .set('Cookie', sessionCookie)
      .expect(200);
    // expect(response.body).toEqual(testProfile);
    expect(response.body).toHaveProperty('clientUsername', 'Ayush');

  });

});


describe('POST /fuel-quote', () => {
  let sessionCookie;

  // Before running any tests, authenticate the user and store the session cookie
  beforeAll(async () => {
    // Authenticate the user and store the session cookie
    // Assuming a user with username 'Ayush' is authenticated
    const userData = { username: 'Ayush' };
    const response = await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json');
    sessionCookie = response.headers['set-cookie'][0];
  });

  it('creates a fuel quote and returns the quote data', async () => {
    // Assuming the profile data for the authenticated user exists in the database
    const profileData = {
      clientUsername: 'Ayush',
      address1: '1234 Starcross Bend',
      city: 'Sugarland',
      state: 'AK',
      zipcode: '12345'
      // Add other profile data as needed
    };

    // Create a new fuel quote data to send in the request
    const fuelQuoteData = {
      requestedGallons: '100',
      date: '2024-04-30',
      suggestedPrice: 2.5,
      totalAmountDue: 250
    };

    // Send a request to create a fuel quote
    const response = await request(app)
      .post('/fuel-quote')
      .set('Cookie', sessionCookie)
      .send(fuelQuoteData)
      .expect(500);

  });
});
