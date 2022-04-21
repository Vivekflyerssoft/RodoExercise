const app = require('../src/app');
const request = require('supertest')
const vehicleService = require('../vehicleService');

const valid_data = [{
    "make": "Acura",
    "model": "TLX",
    "year": 2021,
    "vehicle_count": 7055,
    "price": 109623
},
{
    "make": "Alfa Romeo",
    "model": "Giulia",
    "year": 2018,
    "vehicle_count": 9,
    "price": 71537
},
{
    "make": "Alfa Romeo",
    "model": "Giulia",
    "year": 2019,
    "vehicle_count": 14,
    "price": 7099
},]
const url = '/api/vehicles'
describe('Vehicles API', () => {
    it('should return 200 for data available', async () => {
        const mock_getVehicles = jest.spyOn(vehicleService, "getVehicles").mockResolvedValue(valid_data)

        const response = await request(app).get(url);
        expect(response.status).toBe(200);

        mock_getVehicles.mockRestore();
    });

    it('should return no content found for no vehicles found', async () => {
        const mock_getVehicles = jest.spyOn(vehicleService, "getVehicles").mockResolvedValue([])

        const response = await request(app).get(url);
        expect(response.status).toBe(204);

        mock_getVehicles.mockRestore();
    });
});