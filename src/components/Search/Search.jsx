import React, {useState} from 'react';
import {AsyncPaginate} from "react-select-async-paginate";
import classes from "./search.module.css";

const Search = ({placeholder, onSearchChange, loadOptions, autoReset = true}) => {

    const [search, setSearch] = useState(null)

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '15px',
            border: '2px solid #2196F3',
            boxShadow: state.isFocused ? '0 0 0 2px #2196F3' : null,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#1D81D1' : null,
            color: state.isFocused ? 'white' : null,
            fontWeight: state.isFocused ? '700' : null,
        }),
    }

    const handleOnChange = (searchData) => {
        onSearchChange(searchData)
        setSearch(autoReset ? null : searchData)
    }

    return (
        <div className={classes.searchBar}>
            <AsyncPaginate
            debounceTimeout={1000}
            placeholder={placeholder}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            value={search}
            styles={customStyles}/>
        </div>
    );
};

export default Search;