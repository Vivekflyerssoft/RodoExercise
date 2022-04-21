const express = require("express");
const app = express();

const vehiclesService = require('../vehicleService');

app.get("/", async (req, res) => {
    res.send({ message: "Rodo search API." });
});

app.get("/api/vehicles", async (req, res) => {
    const data = await vehiclesService.getVehicles();
    if (data && data.length > 0) {
        return res.status(200).send(data);
    } else {
        return res.status(204).send();
    }
})

module.exports = app;