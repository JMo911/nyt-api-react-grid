import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './components/pagination';
import SearchForm from './components/searchForm';
import Table from './components/table';

const initialFilterState = {
  url: '',
  publication_dt: '',
  byline: '',
  book_title: '',
  book_author: '',
  summary: '',
  uuid: '',
  uri: '',
  isbn13: '',
}

function App() {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedData, setPaginatedData] = useState([]);
  const [author, setAuthor] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [title, setTitle] = useState('');
  const [titleQuery, setTitleQuery] = useState('');
  const [filters, setFilters] = useState<any>(initialFilterState);
  const [filteredApiData, setFilteredApiData] = useState([]);

  useEffect(() => {
    const baseUrl = 'https://api.nytimes.com/svc/books/v3/reviews.json';
    let parameters = '';
    if (authorQuery.length > 0 && titleQuery.length > 0) {
      parameters = `?author=${authorQuery}&title=${titleQuery}&api-key=`;
    } else if (authorQuery.length > 0 && titleQuery.length === 0) {
      parameters = `?author=${authorQuery}&api-key=`;
    } else if (authorQuery.length === 0 && titleQuery.length > 0) {
      parameters = `?title=${titleQuery}&api-key=`;
    }

    const apiKey = 'XUEjd5XvDHmo8qIhLzksKwJ7lvRyn6An';
    const fullUrl = baseUrl + parameters + apiKey;
    const fetchData = (url: string) => {
      fetch(url)
      .then(res => res.json())
      .then(json => {setApiData(json.results)})
    }
    fetchData(fullUrl)
  }, [authorQuery, titleQuery])

  useEffect(() => {
    const updatePaginatedData = (pageNumber: number) => {
      if (apiData && apiData.length > 0) {
        const indexOfLastRecord = pageNumber * rowsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
        const relevantRecords = apiData.slice(indexOfFirstRecord, indexOfLastRecord);
        setPaginatedData(relevantRecords);
      } else {
        setPaginatedData([]);
      }
    }
    updatePaginatedData(currentPage);
  }, [apiData, rowsPerPage, currentPage])

  useEffect(() => {
    const executeFilters = (data: any) => {
      const columns = data && data[0] && Object.keys(data[0]);
      const filteredData = data && data.filter((row: any) => 
        columns.some((column: any) => row[column].toString().toLowerCase().indexOf(filters[column].toString().toLowerCase()) > -1)
      )
      setFilteredApiData(filteredData);
    }
    executeFilters(apiData);
  }, [apiData, filters])

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const updateRowsPerPage = (numberOfRows: number) => {
    setRowsPerPage(numberOfRows);
  }

  const updateAuthor = (author: string) => {
    setAuthor(author);
  }

  const updateAuthorQuery = (author: string) => {
    setAuthorQuery(author);
  }

  const updateTitle = (title: string) => {
    setTitle(title);
  }

  const updateTitleQuery = (title: string) => {
    setTitleQuery(title);
  }

  const updateFilters = (column: string, columnValue: string) => {
    const prevFilters = {...filters}
    prevFilters[column] = columnValue
    setFilters(prevFilters);
  }

  const totalRows = apiData && apiData.length;

  return (
    <div className="wrapper">
      {/* SEARCH FORM */}
      <SearchForm data={apiData} author={author} updateAuthor={updateAuthor} updateAuthorQuery={updateAuthorQuery} title={title} updateTitle={updateTitle} updateTitleQuery={updateTitleQuery} />

      {/* DATA TABLE */}
      <div className='table-ternary'>{paginatedData.length > 0 ? <Table data={paginatedData} updateFilters={updateFilters} /> : 'Please search a valid author and/or title to see books.'}</div> 

      {/* PAGINATION */}
      <div>{paginatedData.length > 0 ? <Pagination totalRows={totalRows} rowsPerPage={rowsPerPage} updateCurrentPage={updateCurrentPage} updateRowsPerPage={updateRowsPerPage} />: ''}</div>
    </div>
  );
}

export default App;
