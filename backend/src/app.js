const express = require("express");
const app = express();
const vehiclesService = require('../vehicleService');


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

app.use((req, res) => {
    return res.status(404).send({ error: "Route not found." })
})

module.exports = app;