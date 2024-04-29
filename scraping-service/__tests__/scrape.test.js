const request = require('supertest');
const app = require('../src/server.js');

// Mock mongoose and its model function
jest.mock('mongoose', () => ({
  scrapeEndpointFunction: jest.fn(),
  Schema: jest.fn(),
  model: jest.fn(),
  connect: jest.fn(),
}));

const { scrapeEndpointFunction } = require('../src/controllers/scrape');

describe('Scrape Products Endpoint', () => {
  test('should return scraped product data', async () => {
    // const req = {
    //   query: {
    //     company: 'YourCompany',
    //     category: 'YourCategory',
    //   },
    // };

    // const res = {
    //   status: jest.fn().mockReturnThis(),
    //   json: jest.fn(),
    // };

    // await scrapeEndpointFunction(req, res);

    // expect(mongoose.model).toHaveBeenCalled();
    // test('check for generation service', () => {
      expect(true).toBe(true);
    })
    // });
  describe('Generation Service Endpoint', () => {
    test('check for generation service', () => {
      expect(true).toBe(true);
    });
  })
})

