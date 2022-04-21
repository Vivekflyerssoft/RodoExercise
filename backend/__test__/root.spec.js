const app = require('../src/app');
const request = require('supertest')

describe('/', () => {
    it('should return \'Rodo search api\'', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Rodo search API.")  
    });
})