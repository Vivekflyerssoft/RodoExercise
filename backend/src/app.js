const express = require("express");
var cors = require('cors')
const app = express();
var morgan = require('morgan')

app.use(cors());
app.use(morgan('dev'))

const vehiclesService = require('./vehicles/vehicleService');


app.get("/", async (req, res) => {
    res.send({ message: "Rodo search API." });
});

app.get("/api/vehicles", async (req, res) => {
    const dataset = await vehiclesService.getMakeAndModelsList();
    if (dataset && dataset.length > 0) {
        return res.status(200).send(dataset);
    } else {
        return res.status(204).send();
    }
})

app.get("/api/vehiclessuggestion", async (req, res) => {
    console.log(req.query);
    const { make, model, year } = req.query;
    console.log(req.query.price);
    const price = Number(req.query.price)
    const data = await vehiclesService.getVehicleSuggestion(make, model, price, year);
    return res.send(data);
})

app.use((req, res) => {
    return res.status(404).send({ error: "Route not found." })
})

module.exports = app;