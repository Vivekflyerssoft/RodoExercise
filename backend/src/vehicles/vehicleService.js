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

const getVehicleSuggestion = async (make, model, price, year) => {
    const data = [...await vehicleRepository.getVehicles()];

    const variable_price = price * 10 / 100;
    const lower_range = price - variable_price
    const higher_range = price + variable_price;
    const ignore_filter = x => true;

    const make_filter = make ? x => x.make === make : ignore_filter;
    const model_filter = model ? x => x.model === model : ignore_filter;
    const year_filter = year ? x => x.year === year : ignore_filter;

    const price_range_filter = price ? x => x.price > lower_range && x.price < higher_range : ignore_filter;

    const filteredData = data.filter(make_filter)
        .filter(model_filter)
        .filter(year_filter)
        .filter(price_range_filter);

    const total_vehicle_count = filteredData.map(x => x.vehicle_count).reduce((pre, curr) => pre + curr, 0);
    const priceList = filteredData.map(x => x.price);
    const getPriceData = {
        low: Math.min(...priceList),
        high: Math.max(...priceList),
        median: median(priceList)
    };
    filteredData.sort((a, b) => a.price - b.price)
    const vehicle_suggestions = filteredData.map(x => { return { make: x.make, model: x.model, count: x.vehicle_count } });
    return {
        total: total_vehicle_count,
        price: getPriceData,
        results: vehicle_suggestions.length < 5 ? vehicle_suggestions : vehicle_suggestions.splice(0, 5)
    }
}

const median = (numeric_array) => {
    numeric_array.sort(function (a, b) {
        return a - b;
    });
    var mid = numeric_array.length / 2;
    return mid % 1 ? numeric_array[mid - 0.5] : (numeric_array[mid - 1] + numeric_array[mid]) / 2;
}

module.exports = { getMakeAndModelsList, getVehicleSuggestion }