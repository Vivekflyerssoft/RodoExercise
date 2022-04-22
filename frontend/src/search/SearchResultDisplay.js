import { React } from "react";

export const SearchResultsDisplay = ({ searchResult }) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Total Vehicles Matched</th>
                    <th>{searchResult.total}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="w">Lowest Price</td>
                    <td>{searchResult.price.low}</td>
                </tr>
                <tr>
                    <td>Median Price</td>
                    <td>{searchResult.price.median}</td>
                </tr>
                <tr>
                    <td>Highest Price</td>
                    <td>{searchResult.price.high}</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th colSpan="2">Matches by Make and Model </th>
                </tr>
            </thead>
            <tbody>
                {searchResult.results.map(x => <ResultRow make={x.make} model={x.model} count={x.count} />)}
            </tbody>
        </table>
    </div>
)


const ResultRow = ({ make, model, count }) => (<tr>
    <td key={make + model}><span className="make-sub-grp">{make}</span> <span className="model-sub-grp">{model}</span></td>
    <td>{count}</td>
</tr>)