export const SearchField = ({ title, uId, option_zero, data, onSelectOptionChanged }) => (
    <div className="select_field">
        <label>{title}</label>
        <select id={uId} onChange={(e) => onSelectOptionChanged(e.target.value)}>
            <option key={option_zero} value="">{option_zero}</option>
            {data.map(make => <option key={make} value={make}>{make}</option>)}
        </select>
    </div >
)