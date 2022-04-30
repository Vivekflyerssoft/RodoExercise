import { createContext, useState, useReducer } from 'react';
import { API_URLS } from '../constants';
import { SearchGroup } from './SearchGroup';
import { reducer } from './SearchReducer';
import { SearchResultsDisplay } from './SearchResultDisplay';

const INITIAL_STATE = {
    make: '',
    model: '',
    year: '',
    price: ''
};
export const SearchContainerContext = createContext()
export const SearchContainer = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [searchResult, setSearchResult] = useState(null)

    const handleSearchClick = () => {
        fetch(`${API_URLS.VEHICLES_SUGGESTION}make=${state.make || ''}&model=${state.model || ''}&price=${state.price}&year=${state.year}`)
            .then((res) => res.json())
            .then(data => setSearchResult(() => data));
    }

    return (
        <SearchContainerContext.Provider value={{ state, dispatch }}>
            <div className="search_container">
                <SearchGroup />
                <button className="search_btn" onClick={() => handleSearchClick()}>Search</button>
                {
                    !searchResult || searchResult.total === 0 ? <p>No result to display</p> : <SearchResultsDisplay searchResult={searchResult} />
                }
            </div>
        </SearchContainerContext.Provider>
    )
}