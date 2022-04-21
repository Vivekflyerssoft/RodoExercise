import { useEffect, useState } from "react";
import { API_URLS } from "../constants";

export const SearchGroup = ({searchDataChanged}) => {
    const [makeAndModelsList, setMakeAndModelList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);

    useEffect(() => {
        fetch(API_URLS.VEHICLES)
            .then(res => res.json())
            .then(result => {
                setMakeAndModelList(() => result);
                setMakeList(() => makeAndModelsList.map(x => x.make));
            })
    })

    const handleSelectFieldChange = (fieldId, value) => {
        const searchData = {
            make: '',
            model: '',
            price: '',
            year: ''
        }
        if (fieldId === 'make') {
            if (value) {
                const getMakeSpecificModels = () => makeAndModelsList.find(x => x.make === value).models;
                setModelList(getMakeSpecificModels);
            } else {
                const clearModels = () => [];
                setModelList(clearModels);
            }
            searchData.model = "";
            searchData.make = value;
        } else if (fieldId === 'model') {
            searchData.model = value;
        } else if (fieldId === 'year') {
            searchData.year = value;
        } else if (fieldId === 'price') {
            searchData.price = value;
        }
        searchDataChanged({...searchData})
    }

    return (
        <div className="search_group">
            <SearchField
                title="Make"
                uId="make"
                option_zero="All makes"
                data={makeList}
                onSelectOptionChanged={handleSelectFieldChange} />

            <SearchField
                title="Model"
                uId="model"
                option_zero="All models"
                data={modelList}
                onSelectOptionChanged={handleSelectFieldChange} />

            <SearchField
                title="Year"
                uId="year"
                option_zero="Any"
                data={[2022, 2021, 2020, 2019]}
                onSelectOptionChanged={handleSelectFieldChange} />

            <SearchField
                title="Price"
                uId="price"
                option_zero="No max price"
                data={[2000, 4000, 6000, 8000]}
                onSelectOptionChanged={handleSelectFieldChange} />
        </div>
    )
}

const SearchField = ({ title, uId, option_zero, data, onSelectOptionChanged }) => (
    <div className="select_field">
        <label>{title}</label>
        <select id={uId} onChange={(e) => onSelectOptionChanged(uId, e.target.value)}>
            <option key={option_zero} value="">{option_zero}</option>
            {data.map(make => <option key={make} value={make}>{make}</option>)}
        </select>
    </div >
)
