import { useState, useMemo } from "react";
import './Pagination.css';

const Pagination = ({page, setPage, totalPages, handleRequest}) => {
    const maxDisplayedNumbers = 6;

    // Shortcut bottons availability states
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const [toStart, setToStart] = useState(false);
    const [toEnd, setToEnd] = useState(false);

    const calculateVisible = () => {

        // Do all pages fit
        if (totalPages <= maxDisplayedNumbers) {
            setToStart(false);
            setPrev(false);

            setToEnd(false);
            setNext(false);

            return [1, totalPages]
        } else {

            // Page is at the threshold start
            if (page <= maxDisplayedNumbers) {
                setToStart(false);
                setPrev(false);
    
                setToEnd(true)
                setNext(true);
    
                return [1, maxDisplayedNumbers]
    
            }
    
            // Page is at the threshold end
            else if (page > totalPages - maxDisplayedNumbers) {
                setToStart(true);
                setPrev(true);
    
                setNext(false);
                setToEnd(false);
    
                return [totalPages - maxDisplayedNumbers - 1, totalPages]
            }
    
            // Page is in the middle
            else {
                setToStart(true);
                setNext(true);
    
                setToEnd(true);
                setPrev(true);
    
                const offset = Math.floor(maxDisplayedNumbers / 2);
    
                const startPage = page - offset;
                const endPage = page + offset;
    
                return [startPage, endPage]
            }
        }
    }

    const getPageList = useMemo(() => {
        let [start, end] = calculateVisible();
        const numButtons = [];

        while (start <= end) {
            numButtons.push(start++)
        }

        return (
            <>
            {numButtons.map((el) => (
                <button id={el === page ? 'current' : ''} key={el} onClick={() => handlePageChange(el)}>
                    {el}
                </button>
            ))}
            </>
        )
    }, [page, totalPages]);

    const handlePageChange = async (i) => {
        // TODO: check for unnessessary renders
        handleRequest(i);
        setPage(i);
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
            {toStart &&
                <button onClick={() => handlePageChange(1)}>
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </button>
            }

            {prev &&
                <button onClick={handlePrevious}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </button>
            }

            {getPageList}

            {next && 
                <button onClick={handleNext}>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            }

            {toEnd &&
                <button onClick={() => handlePageChange(totalPages)}>
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </button>
            }
        </div>
    )
}

export default Pagination;

