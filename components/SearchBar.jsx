import React from 'react'

const SearchBar = ({setQuery}) => {
    return (
        <div className="search-container">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} type="text" placeholder="Search for a country" />
        </div>
    )
}

export default SearchBar
