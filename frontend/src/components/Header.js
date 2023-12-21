import React from "react"
import "./Header.css"

const Header = ({query, sendRequest, setQuery}) => {
    const handleSearch = async (e) => {
        e.preventDefault();
        sendRequest();
    };

    return (
        <div className='title-search'>
            <h2 className="title">Movie Search</h2>
            <form className='search-bar'>
                <input type="text" value={query} placeholder="Search movies..." onChange={(e) => setQuery(e.target.value)} />
                <button type="submit" onClick={handleSearch}><i className="fa fa-search" aria-hidden="true"></i></button>
            </form>

        </div>
    )
}

export default Header;