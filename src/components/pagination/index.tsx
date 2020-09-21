import React from 'react';
import './styles.css';

export default function Pagination({ totalRows, rowsPerPage, updateCurrentPage, updateRowsPerPage }: any) {
    // shows clickable page numbers.. need to know how many pages there are...
    // based on total rows in response and number of rows per page
    // needs to send up current page to app component so we know which rows to display
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const pages = [];
    for (let i = 1; i < totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className='pagination-wrapper'>
            {
                pages.length > 0 && pages.map(page => {
                    return <button type="button" className="btn btn-primary btn-pages" key={page} onClick={(() => updateCurrentPage(page))} >
                        {page}
                    </button>
                })
            }
            <span>Records per page: </span>
            <select className="custom-select" onChange={(e) => updateRowsPerPage(e.target.value)}>
                <option selected value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    )
}
