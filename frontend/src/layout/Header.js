import React, { useEffect } from "react"
import "./Header.css"
import { useDebounce } from '../utils/debounce';

const Header = ({handleRequest, setQuery}) => {
    const handleClick = async (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    const handleTextChange = async (e) => {
        if (e.target.value.length >= 3) {
            setQuery(e.target.value);
        }
    };

    return (
        <div className='title-search'>
            <h3 className="title">Movie Search</h3>
            <form className='search-bar'>
                <input type="text" placeholder="Search movies..." onChange={useDebounce(handleTextChange, 500)} />
                <button type="submit" onClick={handleClick}><i className="fa fa-search" aria-hidden="true" ></i></button>
            </form>

        </div>
    )
}

export default Header;