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
        setSearchData(() => data);
    }

    const handleSearchClick = () => {

        // TODO: Remove the below hard coded line
        const dummy_data = {
            total: 1899,
            price: {
                low: 7539,
                median: 19513.5,
                high: 32075
            },
            results: [
                { make: 'Toyota', model: 'Highlander', count: '316' },
                { make: 'Toyota', model: 'Highlander 4 * 4', count: '10' },
                { make: 'Toyota', model: 'Hybrid', count: '779' },
            ]
        };
        setSearchResult(() => dummy_data)
        
        // fetch(API_URLS.VEHICLES_SUGGESTION, 'http://localhost:3000/game', {
        //     method: 'POST',
        //     body: JSON.stringify(searchData),
        // })
        //     .then((res) => res.json())
        //     .then(data => setSearchResult(() => dummy_data));

    }

    return (
        <div className="search_container">
            <SearchGroup searchDataChanged={() => handleSearchDataChange()} />
            <button className="search_btn" onClick={() => handleSearchClick()}>Search</button>
            {
                !searchResult ? <p>No result to display</p> : <SearchResultsDisplay searchResult={searchResult} />
            }
        </div>
    )
}