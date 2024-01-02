import React, { useEffect, useState } from "react"
import "./Header.css"
import { useDebounce } from '../utils/debounce';

const Header = ({setQuery}) => {
    const [userInput, setUserInput] = useState('');

    const debounceInputSet = useDebounce(setUserInput, 500)

    const handleClick = async (e) => {
        e.preventDefault();
        setQuery(userInput);
    };

    const handleTextChange = (e) => {
        const trimmedInput = e.target.value.trim();
        debounceInputSet(trimmedInput);
    };

    useEffect(() => {
        if (userInput.length >= 3) {
            setQuery(userInput);
        }
    }, [userInput])


    return (
        <header className='title-search'>
            <h3 className="title">Movie Search</h3>
            <form className='search-bar'>
                <input type="text" placeholder="Search movies..." onChange={handleTextChange} maxLength={200}/>
                <button type="submit" onClick={handleClick}><i className="fa fa-search" aria-hidden="true" ></i></button>
            </form>

        </header>
    )
}

export default Header;