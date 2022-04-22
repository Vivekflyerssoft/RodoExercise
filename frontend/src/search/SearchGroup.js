import { useEffect, useState } from "react";
import { API_URLS } from "../constants";

export const SearchGroup = ({ searchDataChanged }) => {
    const FIELDS = {
        make: 'make',
        model: 'model',
        year: 'year',
        price: 'price'
    }

    const [makeAndModelsList, setMakeAndModelList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);

    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    useEffect(() => {
        notifySearchOptionsChanged();
    }, [selectedMake, selectedModel, selectedYear, selectedPrice])

    useEffect(() => {
        fetch(API_URLS.VEHICLES)
            .then(res => res.json())
            .then(result => {
                setMakeAndModelList(() => result);
                setMakeList(() => makeAndModelsList.map(x => x.make));
            })
    }, [makeAndModelsList.length])

    const notifySearchOptionsChanged = () => {
        const data = { make: selectedMake, model: selectedModel, year: selectedYear, price: selectedPrice };
        searchDataChanged({ ...data });
    }

    const updateSelectedMake = (value) => {
        let updateModel;
        if (value) {
            updateModel = makeAndModelsList.find(x => x.make === value).models;
        } else {
            updateModel = [];
        }
        setModelList(updateModel);
        setSelectedModel("");
        setSelectedMake(value);
    }

    return (
        <div className="search_group">
            <SearchField
                title="Make"
                uId={FIELDS.make}
                option_zero="All makes"
                data={makeList}
                onSelectOptionChanged={(value) => updateSelectedMake(value)} />

            <SearchField
                title="Model"
                uId={FIELDS.model}
                option_zero="All models"
                data={modelList}
                onSelectOptionChanged={(value) => setSelectedModel(value)} />

            <SearchField
                title="Year"
                uId={FIELDS.year}
                option_zero="Any"
                data={[2022, 2021, 2020, 2019]}
                onSelectOptionChanged={(value) => setSelectedYear(value)} />

            <SearchField
                title="Price"
                uId={FIELDS.price}
                option_zero="No max price"
                data={[2000, 4000, 6000, 8000]}
                onSelectOptionChanged={(value) => setSelectedPrice(value)} />
        </div>
    )
}

const SearchField = ({ title, uId, option_zero, data, onSelectOptionChanged }) => (
    <div className="select_field">
        <label>{title}</label>
        <select id={uId} onChange={(e) => onSelectOptionChanged(e.target.value)}>
            <option key={option_zero} value="">{option_zero}</option>
            {data.map(make => <option key={make} value={make}>{make}</option>)}
        </select>
    </div >
)

