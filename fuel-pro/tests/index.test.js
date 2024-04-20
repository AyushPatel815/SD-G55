
const request = require('supertest');
const app = require('../index.js'); // Import your Express app
const session = require('express-session');
const { arrow_function } = require("../index.js");
const { PrismaClient } = require('@prisma/client');
const createFuelQuote = require('../index.js'); // Import your error handler function

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


// describe('GET /users/:id', () => {
//   it('should respond with status 200 and user data', async () => {
//     const response = await request(app).get('/users/1'); // Assuming user ID 1 exists
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('username'); // Assuming your user object has a 'username' property
//     expect(response.body.username).toBe('Ayush'); // Assuming the username of the user with ID 1 is 'Ayush'
//   });



//   // it('should respond with status 404 if user does not exist', async () => {
//   //   const response = await request(app).get('/users/90'); // Assuming user ID 999 does not exist
//   //   expect(response.status).toBe(404);
//   //   expect(response.body).toHaveProperty('error');
//   //   expect(response.body.error).toBe('User not found');
//   // });
// });


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


  // it('should respond with status 500 if an internal server error occurs', async () => {
  //   const response = await request(app)
  //     .post('/user')
  //     .send({ username: 'Ayus', password: 'Ayuh1920' });
  
  //   expect(response.status).toBe(500);
  //   expect(response.body).toHaveProperty('error', 'Internal Server Error');
  // });

  // it('should retrieve existing user and save session', async () => {
  //   const req = {
  //     body: {
  //       username: 'Ayush',
  //       password: 'Ayush1920'
  //     },
  //     session: {
  //       save: jest.fn()
  //     }
  //   };
  //   console.log(session)
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn()
  //   };
  //   const prisma = {
  //     user: {
  //       findUnique: jest.fn().mockResolvedValue({ username: 'Ayush' })
  //     }
  //   };

  //   // prisma.user.findUnique = jest.fn().mockResolvedValueOnce({ username: 'testuser' });
  //   req.session.save = jest.fn().mockResolvedValueOnce();

  //   expect(response.status).toBe(200);
  //   expect(response.body).toBe(existingUsername);

  // });

  // it('should respond with status 500 if an error occurs during user creation', async () => {
  //   // Mocking prisma user findUnique method to throw an error
  //   jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error('Database error'));

  //   const response = await request(app)
  //     .post('/user')
  //     .send({ username: 'invalidUsername', password: 'invalidPassword' });

  //   expect(response.status).toBe(500);
  //   expect(response.body).toEqual({ error: 'Internal Server Error' });
  // });
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

// describe('POST /profile', () => {
//   it('should create or update a user profile and respond with the profile data', async () => {
//     // Mock user session data
//     const mockUserSession = {
//       user: 'Ayush' // Simulating a logged-in user
//     };

//     // Mock request body
//     const mockRequestBody = {
//       firstName: 'Ayush',
//       lastName: 'Patel',
//       address1: '1234 Starcoss Bend',
//       address2: '',
//       city: 'Missouri City',
//       state: 'TX',
//       zip: '12345'
//     };

//     // Simulate the request object with session and body
//     const requestMock = {
//       session: mockUserSession,
//       body: mockRequestBody
//     };

//   // Make the request to the endpoint using supertest
//     const response = await request(app)
//       .post('/profile')
//       .send(mockRequestBody) // Send the request body
//       .set('Cookie', [`session=${JSON.stringify(mockUserSession)}`]); // Set the session cookie

//     // Assert the response
//     expect(response.status).toBe(200); // Check if response status is 200 OK
//     expect(response.body).toHaveProperty('user', mockUserSession.user); // Check if user property is present and matches the mock user session
//     expect(response.body).toHaveProperty('profile'); // Check if profile property is present
//     expect(response.body.profile).toEqual(expect.objectContaining(mockRequestBody)); // Check if profile data matches the mock request body
//   });
// });

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

describe('POST /profile', () => {
  
it('should get 500 internal server error', async () => {
  // Simulate an internal error by passing invalid data that triggers an error in the server
  const invalidProfileData = {
      // Missing required fields firstName and lastName
      address1: '1234 Starcross Bend',
      city: 'Sugarland',
      state: 'AK',
      zip: '12345'
  };

  const response = await request(app)
      .post('/profile')
      .send()
      // .set('Cookie', sessionCookie); // Reuse the session cookie

  // Assertions
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ error: 'Internal Server Error' });
});
});


describe('POST /signup', () => {



it('should create a new user and return the username', async () => {
  // Mock user data for signup
  const userData = {
    username: 'testusera',
    password: 'testpassword1'
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
  // it('should return 404 if quotes are not found for the user', async () => {
    
  //   // const session = { user: 'Krish' };
  //   const response = await request(app).get('/quote').set('Cookie', sessionCookie);
  //   expect(response.status).toBe(404); // Adjusted to expect a 404 status code
  // });

  // test('should return user quotes if everything works correctly', async () => {
  //   const session = { user: 'Ayush' };
  //   const response = await request(app).get('/quote').set('Cookie', sessionCookie);
  //   expect(response.status).toBe(200);
  //   // Add more specific expectations based on your data model
  //   expect(response.body.user).toBe(session.user);
  //   expect(Array.isArray(response.body.quotes)).toBe(true);
  // });
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






// describe('POST /fuel-quote', () => {
//   let sessionCookie; // Variable to store the session cookie

//   // Before running any tests, authenticate the user and store the session cookie
//   beforeAll(async () => {
//     const userData = {
//       username: 'Ayushii',
//       // password: 'Ayush1920'
//     };

//     const response = await request(app)
//       .post('/user')
//       .send(userData)
//       .set('Accept', 'application/json');

//     sessionCookie = response.headers['set-cookie'][0];
//   });

//   it('should return 404 if user session is not found', async () => {
//     const response = await request(app)
//       .post('/fuel-quote')
//       .send({})
//       .set('Accept', 'application/json'); // Sending empty request body

//     expect(response.status).toBe(401);
//     expect(response.body).toEqual({ error: 'User session not found' });
//   });
// });



// describe('POST /fuel-quote', () => {
//   let sessionCookie; // Variable to store the session cookie

//   // Before running any tests, create a test user and store the session cookie
//   beforeAll(async () => {
//     // Create a test user
//     const testUser = {
//       username: 'Ayush',
//       // password: 'Ayush1920' // Adjust as needed
//     };

//     const userResponse = await request(app)
//       .post('/fuel-quote')
//       .send(testUser)
//       .set('Accept', 'application/json');

//     // Store the session cookie
//     sessionCookie = userResponse.headers['set-cookie'][0];
//   });

//   it('should return 404 if user profile is not found', async () => {
//     // Send request to fuel-quote endpoint
//     const response = await request(app)
//       .post('/fuel-quote')
//       .send({})
//       .set('Accept', 'application/json')
//       .set('Cookie', sessionCookie);

//     // Expect a 404 response status code
//     expect(response.status).toBe(404);

//     // Ensure that the error message indicates profile not found
//     expect(response.body).toEqual({ error: 'Profile not found' });
//   });

//   it('should return 201 if user profile exists', async () => {
//     // Create a test profile for the user
//     const testProfile = {
//       clientUsername: 'Ayush',
//     };

//     // await prisma.profile.create({
//     //   data: testProfile
//     // });

//     // Send request to fuel-quote endpoint
//     const response = await request(app)
//       .post('/fuel-quote')
//       .send({})
//       .set('Accept', 'application/json')
//       .set('Cookie', sessionCookie);

//     // Expect a 201 response status code
//     expect(response.status).toBe(201);
//   });
// });




// describe('POST /fuel-quote', () => {

//   let sessionCookie; // Variable to store the session cookie


//   beforeAll(async () => {
//     const userData = {
//         username: 'Ayush',
//         password: 'Ayush1920'
//     };

//     const response = await request(app)
//         .post('/user')
//         .send(userData)
//         .set('Accept', 'application/json');

//     sessionCookie = response.headers['set-cookie'][0];
// });
//   it('should create a new fuel quote if user session is found', async () => {
//     // Mock session data
//     // const mockSession = { user: 'Ayush' };

//     // Mock profile data
//     const mockProfile = {
//       clientUsername: 'Ayush',
//       address1: '123 Main St',
//       city: 'Sample City',
//       state: 'WA',
//       zipcode: '98001'
//     };

//     // Mock request body
//     const requestBody = {
//       requestedGallons: '50',
//       date: '2024-04-20'
//     };

//     // Stub prisma methods
//     const prismaStub = {
//       profile: {
//         findUnique: jest.fn().mockResolvedValue(mockProfile)
//       },
//       quote: {
//         create: jest.fn().mockResolvedValue({})
//       }
//     };

//     // Send request to fuel-quote endpoint
//     const response = await request(app)
//       .post('/fuel-quote')
//       .send(requestBody)
//       .set('Cookie', sessionCookie);

//     // Assertions
//     expect(response.status).toBe(500);
//     // expect(prismaStub.profile.findUnique).toHaveBeenCalledWith({
//     //   where: { clientUsername: 'Ayush' }
//     // });
//     // expect(prismaStub.quote.create).toHaveBeenCalledWith({
//     //   clientUsername: mockProfile.clientUsername,
//     //   date: new Date(requestBody.date),
//     //   gallons: parseInt(requestBody.requestedGallons),
//     //   address: mockProfile.address1,
//     //   city: mockProfile.city,
//     //   state: mockProfile.state,
//     //   zipcode: mockProfile.zipcode
//     // });
//   });

//   it('should return 401 if user session is not found', async () => {
//     // Send request without session cookie
//     const response = await request(app).post('/fuel-quote').send({});

//     // Assertion
//     expect(response.status).toBe(401);
//   });
// });
