import React from "react"
import "./Header.css"

const Header = ({query, handleRequest, setQuery}) => {
    const handleSearch = async (e) => {
        e.preventDefault();
        handleRequest();
    };

    const handleTextChange = async (e) => {
        setQuery(e.target.value)
        if (e.target.value.length >= 3) {
            handleRequest();
        }
    };

    return (
        <div className='title-search'>
            <h3 className="title">Movie Search</h3>
            <form className='search-bar'>
                <input type="text" value={query} placeholder="Search movies..." onChange={handleTextChange} />
                <button type="submit" onClick={handleSearch}><i className="fa fa-search" aria-hidden="true" ></i></button>
            </form>

        </div>
    )
}

export default Header;