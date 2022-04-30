import { useState } from 'react';
import { API_URLS } from '../constants';
import { SearchGroup } from './SearchGroup';
import { SearchResultsDisplay } from './SearchResultDisplay';

export const SearchContainer = () => {
    const [searchData, setSearchData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });
    const [searchResult, setSearchResult] = useState(null)

    const handleSearchDataChange = (data) => {
        setSearchData(data);
    }

    const handleSearchClick = () => {
        fetch(`${API_URLS.VEHICLES_SUGGESTION}make=${searchData.make || ''}&model=${searchData.model || ''}&price=${searchData.price}&year=${searchData.year}`)
            .then((res) => res.json())
            .then(data => setSearchResult(() => data));
    }

    return (
        <div className="search_container">
            <SearchGroup searchDataChanged={(value) => handleSearchDataChange(value)} />
            <button className="search_btn" onClick={() => handleSearchClick()}>Search</button>
            {
                !searchResult || searchResult.total === 0 ? <p>No result to display</p> : <SearchResultsDisplay searchResult={searchResult} />
            }
        </div>
    )
}