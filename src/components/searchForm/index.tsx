import React from 'react';
import './styles.css';

export default function SearchForm() {
    return (
        <div className='search-form-wrapper'>
            <form>
                <div className="form-group">
                    <label htmlFor="authorSearch">Search by Author:</label>
                    <input type="text" className="form-control" id="authorSearch" aria-describedby="authorSearch" />
                </div>
                <div className="form-group">
                    <label htmlFor="titleSearch">Search by Title:</label>
                    <input type="text" className="form-control" id="titleSearch" aria-describedby="titleSearch" />
                </div>
                <div className="button-wrapper">
                <button type="submit" className="btn btn-primary" id='submit-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}
