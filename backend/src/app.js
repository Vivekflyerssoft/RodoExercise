const express = require("express");
const app = express();

const vehiclesService = require('../vehicleService');

app.get("/", async (req, res) => {
    res.send({ message: "Rodo search API." });
});

app.get("/api/vehicles", async (req, res) => {
    const data = await vehiclesService.getVehicles();

    if (data && data.length > 0) {
        const dataset = [];
        data.map(item => {
            const existing_make = dataset.find(x => x.make === item.make);
            if (existing_make) {
                const existing_model = existing_make.models.find(model => model === item.model);
                if (!existing_model) {
                    dataset.models.push(item.model);
                }
            } else {
                dataset.push({ make: item.make, models: [item.model] });
            }
        })
        return res.status(200).send(dataset);
    } else {
        return res.status(204).send();
    }
})

module.exports = app;