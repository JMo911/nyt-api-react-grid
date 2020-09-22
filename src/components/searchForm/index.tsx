import React from 'react';
import './styles.css';

export default function SearchForm({ data, author, updateAuthor, updateAuthorQuery, title, updateTitle, updateTitleQuery }: any) {
    // const authors: any = [];

    // data.length > 0 && data.forEach((row: any) => {
    //     return authors.push(row['book_author'])
    // })

    const userFormattedAuthor = author.length > 0 ? author.replace('+', ' ') : '';

    const handleSubmit =  (e: any) => {
        e.preventDefault();
        updateAuthorQuery(author);
        updateTitleQuery(title)
    }

    return (
        <div className='search-form-wrapper' onSubmit={(e) => handleSubmit(e)}>
            <form>
                {/* <div className="form-group">
                    <label htmlFor="authorSelect">Author:</label>
                    <select className="form-control" id="authorSelect">
                        {
                            authors.length > 0 && authors.map((author: any) => {
                                return <option>{author}</option>
                            })
                        }
                    <option>1</option>
                    </select>
                </div> */}
                <div className="form-group">
                    <label htmlFor="authorSearch">Search by Author:</label>
                    <input type="text" className="form-control" id="authorSearch" aria-describedby="authorSearch" value={userFormattedAuthor} onChange={(e) => updateAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="titleSearch">Search by Title:</label>
                    <input type="text" className="form-control" id="titleSearch" aria-describedby="titleSearch" onChange={(e) => updateTitle(e.target.value)} />
                </div>
                <div className="button-wrapper">
                <button type="submit" className="btn btn-primary" id='submit-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}
