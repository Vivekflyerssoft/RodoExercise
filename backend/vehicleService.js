const vehicleRepository = require('./vehicleRepository')

const getMakeAndModelsList = async () => {
    const data = await vehicleRepository.getVehicles();
    const dataset = [];
    if (data && data.length > 0) {
        data.map(item => {
            const existing_make = dataset.find(x => x.make === item.make);
            if (!existing_make) {
                dataset.push({ make: item.make, models: [item.model] });
            } else {
                const existing_models = existing_make.models.find(model => model === item.model);
                if (!existing_models) {
                    existing_make.models.push(item.model);
                }
            }
        });
    }
    return dataset;
}

module.exports = { getMakeAndModelsList }