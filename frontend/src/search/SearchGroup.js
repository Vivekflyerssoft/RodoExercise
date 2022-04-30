import { useEffect, useState, useContext } from "react";
import { API_URLS } from "../constants";
import { FIELDS, PRICES_AVAILABLE, ACTIONS } from "./Constants";
import { SearchContainerContext } from "./SearchContainer";
import { SearchField } from "./SearchField";

export const SearchGroup = () => {
    const [makeAndModelsList, setMakeAndModelsList] = useState([]);
    const [modelList, setModelList] = useState([]);

    const { dispatch } = useContext(SearchContainerContext)

    useEffect(() => {
        fetch(API_URLS.VEHICLES)
            .then(res => res.json())
            .then(result => setMakeAndModelsList(result))
    }, [])

    return (
        <div className="search_group">
            <SearchField
                title="Make"
                uId={FIELDS.make}
                option_zero="All makes"
                data={makeAndModelsList.map(x => x.make)}
                onSelectOptionChanged={(value) => {
                    dispatch({ type: ACTIONS.MAKE, payload: value })
                    setModelList(value ? makeAndModelsList.find(x => x.make === value).models : [])
                }} />

            <SearchField
                title="Model"
                uId={FIELDS.model}
                option_zero="All models"
                data={modelList}
                onSelectOptionChanged={(value) => dispatch({ type: ACTIONS.MODEL, payload: value })} />

            <SearchField
                title="Year"
                uId={FIELDS.year}
                option_zero="Any"
                data={[2022, 2021, 2020, 2019]}
                onSelectOptionChanged={(value) => dispatch({ type: ACTIONS.YEAR, payload: value })} />

            <SearchField
                title="Price"
                uId={FIELDS.price}
                option_zero="No max price"
                data={PRICES_AVAILABLE}
                onSelectOptionChanged={(value) => dispatch({ type: ACTIONS.PRICE, payload: value })} />
        </div>
    )
}



