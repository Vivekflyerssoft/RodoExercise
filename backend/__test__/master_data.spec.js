const app = require('../src/app');
const request = require('supertest')
const vehicleRepository = require('../src/vehicles/vehicleRepository');

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
    it.each`
        scenario         | data          | status
        ${'valid'}       | ${valid_data} | ${200}
        ${'empty array'} | ${[]}         | ${204}
        ${'null'}        |${null}        | ${204}
    `('should return status $status for given $scenario', async ({scenario, data, status}) => {
        const mock_getVehicles = jest.spyOn(vehicleRepository, "getVehicles").mockResolvedValue(data)

        const response = await request(app).get(url);
        expect(response.status).toBe(status);

        mock_getVehicles.mockRestore();
    })

    it('should return object array with key \'make\' and \'model\' array for valid data', async () => {
        const mock_getVehicles = jest.spyOn(vehicleRepository, "getVehicles").mockResolvedValue(valid_data)
        const response = await request(app).get(url);

        expect(Object.keys(response.body[0])).toEqual(['make', 'models'])

        mock_getVehicles.mockRestore();
    });
});