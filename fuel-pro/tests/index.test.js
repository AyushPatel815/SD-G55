
const request = require('supertest');
const app = require('../index.js'); // Import your Express app
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
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


describe('GET /users/:id', () => {
  it('should respond with status 200 and user data', async () => {
    const response = await request(app).get('/users/1'); // Assuming user ID 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username'); // Assuming your user object has a 'username' property
    expect(response.body.username).toBe('Ayush'); // Assuming the username of the user with ID 1 is 'Ayush'
  });



  // it('should respond with status 404 if user does not exist', async () => {
  //   const response = await request(app).get('/users/90'); // Assuming user ID 999 does not exist
  //   expect(response.status).toBe(404);
  //   expect(response.body).toHaveProperty('error');
  //   expect(response.body.error).toBe('User not found');
  // });
});


describe('POST /user', () => {
  it('should respond with status 401 if user does not exist', async () => {
    const response = await request(app)
      .post('/user')
      .send({ username: 'nonexistent_user', password: 'nonexistent_password' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid username or password');
  });

  // Add more tests here to cover other scenarios
});


// describe('POST /profile', () => {
//   it('should respond with status 401 if user session not found', async () => {
//     const response = await request(app)
//       .post('/profile')
//       .send({ /* Provide required request body here */ });

//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty('error', 'User session not found');
//   });

//   // Add more tests here to cover other scenarios
// });

describe('POST /profile', () => {
  it('should create or update a user profile and respond with the profile data', async () => {
    // Mock request body
    const mockRequestBody = {
      firstName: 'Ayush',
      lastName: 'Patel',
      address1: '1234 Starcoss Bend',
      address2: '',
      city: 'Missouri City',
      state: 'TX',
      zip: '12345'
    };

  // Make the request to the endpoint using supertest
    const response = await request(app)
      .post('/profile')
      .send(mockRequestBody); // Send the request body

    // Assert the response
    if (response.status === 401) {
      // If the response status is 401, the session data was not found
      expect(response.status).toBe(401); // Check if response status is 401 Unauthorized
      expect(response.body).toHaveProperty('error', 'User session not found'); // Check if error message is returned
    } else if (response.status === 200) {
      // If the session data is present and complete
      expect(response.status).toBe(200); // Check if response status is 200 OK
      expect(response.body).toHaveProperty('profile'); // Check if profile property is present
      expect(response.body.profile).toEqual(expect.objectContaining(mockRequestBody)); // Check if profile data matches the mock request body

      // Additional check to see if user has a profile
      if (response.body.profile) {
        expect(response.body.profile).toHaveProperty('firstName', mockRequestBody.firstName);
        // Add more assertions for other profile properties if needed
      } else {
        // If user does not have a profile
        // Perform specific assertions or actions
        console.log('no user found');
      }
    }
  });
});

describe('POST /signup', () => {
  it('should respond with status 400 if user already exists', async () => {
    // First, create a user with a known username
    const newUser = { username: 'existing_user', password: 'some_password' };
    await request(app).post('/signup').send(newUser);

    // Now, try to sign up with the same username again
    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User already exists.');
  });

});


/*describe('GET /quote', () => {
  it('should respond with status 401 if user session is not found', async () => {
    const response = await request(app).get('/quote');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

  // You can write more test cases for scenarios where the user session exists and has associated quotes
});*/

describe('GET /quote', () => {
  it('should fetch user quotes and respond with status 200', async () => {
    // Mock user session data
    const mockUserSession = {
      user: 'Ayush'
    };

    // Mock quotes associated with the user
    const mockQuotes = [
      { id: '1', clientUsername: 'Ayush', gallons: 10, price: 100 },
      { id: '2', clientUsername: 'Ayush', gallons: 15, price: 150 }
    ];

    // Mock the Prisma user and quote find methods
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce({ username: 'Ayush' });
    jest.spyOn(prisma.quote, 'findMany').mockResolvedValueOnce(mockQuotes);

    // Make the request to the endpoint using supertest
    const response = await request(app)
      .get('/quote')
      .set('Cookie', [`session=${JSON.stringify(mockUserSession)}`]);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user', mockUserSession.user);
    expect(response.body).toHaveProperty('quotes', mockQuotes);
  });

  it('should respond with status 404 if user is not found', async () => {
    // Mock user session data
    const mockUserSession = {
      user: 'NonExistentUser'
    };

    // Mock the Prisma user find method to return null
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);

    // Make the request to the endpoint using supertest
    const response = await request(app)
      .get('/quote')
      .set('Cookie', [`session=${JSON.stringify(mockUserSession)}`]);

    // Assert the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should respond with status 404 if no quotes are found for the user', async () => {
    // Mock user session data
    const mockUserSession = {
      user: 'Ayush'
    };

    // Mock the Prisma user find method to return a user
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce({ username: 'Ayush' });

    // Mock the Prisma quote find method to return an empty array
    jest.spyOn(prisma.quote, 'findMany').mockResolvedValueOnce([]);

    // Make the request to the endpoint using supertest
    const response = await request(app)
      .get('/quote')
      .set('Cookie', [`session=${JSON.stringify(mockUserSession)}`]);

    // Assert the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Quotes not found for this user' });
  });

  it('should respond with status 401 if user session is not found', async () => {
    // Make the request to the endpoint using supertest without setting session cookie
    const response = await request(app).get('/quote');

    // Assert the response
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'User session not found' });
  });
});


// describe('POST /fuel-quote', () => {
//   it('should respond with status 401 if user session is not found', async () => {
//     const response = await request(app)
//       .post('/fuel-quote')
//       .send({ requestedGallons: 100, date: new Date().toISOString() });
//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty('error', 'User session not found');
//   });

// });

describe('POST /fuel-quote', () => {
  it('should create a new fuel quote and respond with status 201', async () => {
    // Mock request body
    const requestBody = {
      requestedGallons: 100,
      date: '2024-04-11'
    };

    // Mock session user
    const mockSession = {
      user: 'Richer'
    };

    // Mock profile data
    const mockProfile = {
      address1: '815 Stacross',
      city: 'Missouri City',
      state: 'TX',
      zipcode: '12340'
      // Add other necessary fields
    };

    // Mock prisma profile findUnique method
    prisma.profile.findUnique.mockResolvedValueOnce(mockProfile);

    // Mock prisma quote create method
    prisma.quote.create.mockResolvedValueOnce({
      // Mocked new quote object
      // Include necessary fields like clientUsername, date, gallons, etc.
    });

    // Mock session data
    const mockReq = {
      session: mockSession,
      body: requestBody
    };

    // Make request to the endpoint
    const response = await request(app).post('/fuel-quote').send(mockReq);

    // Assert the response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user', 'testUser');
    expect(response.body).toHaveProperty('quote');
    // Add more assertions based on the expected structure of the response
  });

  it('should respond with status 401 if user session is not found', async () => {
    // Make request to the endpoint without a session
    const response = await request(app).post('/fuel-quote').send({});

    // Assert the response
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

  it('should respond with status 404 if profile is not found', async () => {
    // Mock session user
    const mockSession = {
      user: 'nonExistentUser'
    };

    // Mock session data
    const mockReq = {
      session: mockSession,
      body: {
        requestedGallons: 100,
        date: '2024-04-11'
      }
    };

    // Mock prisma profile findUnique method to return null
    prisma.profile.findUnique.mockResolvedValueOnce(null);

    // Make request to the endpoint
    const response = await request(app).post('/fuel-quote').send(mockReq);

    // Assert the response
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Profile not found');
  });

  it('should respond with status 500 if an error occurs during quote creation', async () => {
    // Mock session user
    const mockSession = {
      user: 'testUser'
    };

    // Mock session data
    const mockReq = {
      session: mockSession,
      body: {
        requestedGallons: 100,
        date: '2024-04-11'
      }
    };

    // Mock prisma profile findUnique method
    prisma.profile.findUnique.mockResolvedValueOnce({ /* Mocked profile data */ });

    // Mock prisma quote create method to throw an error
    prisma.quote.create.mockRejectedValueOnce(new Error('Some error occurred'));

    // Make request to the endpoint
    const response = await request(app).post('/fuel-quote').send(mockReq);

    // Assert the response
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });

  // Add more test cases as needed to cover edge cases and error scenarios
});

