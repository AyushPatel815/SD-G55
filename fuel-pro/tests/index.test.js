
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


describe('POST /profile', () => {
  it('should respond with status 401 if user session not found', async () => {
    const response = await request(app)
      .post('/profile')
      .send({ /* Provide required request body here */ });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

  // Add more tests here to cover other scenarios
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


describe('GET /quote', () => {
  it('should respond with status 401 if user session is not found', async () => {
    const response = await request(app).get('/quote');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

  // You can write more test cases for scenarios where the user session exists and has associated quotes
});


describe('POST /fuel-quote', () => {
  it('should respond with status 401 if user session is not found', async () => {
    const response = await request(app)
      .post('/fuel-quote')
      .send({ requestedGallons: 100, date: new Date().toISOString() });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'User session not found');
  });

});

