import { useState } from "react";
import './Pagination.css';

const Pagination = ({totalPages, sendRequest}) => {
    const [page, setPage] = useState(1);

    const handlePageChange = async (i) => {
        setPage(i);
        sendRequest(i);
    }

    // handler for the next button
    function handleNext() {
        handlePageChange(page+1);
    };
    
    // handler for the previous button
    function handlePrevious() {
        handlePageChange(page-1);
    };

    return (
        <div className='pagination'>
            <button onClick={handlePrevious}>
                prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button id={index + 1 === page && 'current'} key={index + 1} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button onClick={handleNext}>
                next
            </button>
        </div>
    )
}

export default Pagination;

