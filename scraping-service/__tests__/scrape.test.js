const request = require('supertest');
const app = require('../src/server.js');

// Mock mongoose and its model function
jest.mock('mongoose', () => ({
  scrapeEndpointFunction: jest.fn(),
  Schema: jest.fn(),
  model: jest.fn(),
  connect: jest.fn(),
}));

// Import the module that contains the endpoint function
const { scrapeEndpointFunction } = require('../src/controllers/scrape');

describe('Scrape Products Endpoint', () => {
  test('should return scraped product data', async () => {
    // Mock the request object
    const req = {
      query: {
        company: 'YourCompany',
        category: 'YourCategory',
      },
    };

    // Mock the response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the endpoint function
    await scrapeEndpointFunction(req, res);

    // Assert that the mongoose.model function was called
    expect(mongoose.model).toHaveBeenCalled();
  });
  describe('Generation Service Endpoint', () => {
    test('check for generation service', () => {
      expect(true).toBe(true);
    });
  });
});

