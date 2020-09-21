import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './components/pagination';
import SearchForm from './components/searchForm';
import Table from './components/table';

function App() {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const baseUrl = 'https://api.nytimes.com/svc/books/v3/reviews.json';
    const parameters = '?author=Stephen+King&api-key=';
    const apiKey = 'XUEjd5XvDHmo8qIhLzksKwJ7lvRyn6An';
    const fullUrl = baseUrl + parameters + apiKey;
    const fetchData = (url: string) => {
      fetch(url)
      .then(res => res.json())
      .then(json => {setApiData(json.results)})
    }
    fetchData(fullUrl)

  }, [])

  useEffect(() => {
    const updatePaginatedData = (pageNumber: number) => {
      const indexOfLastRecord = pageNumber * rowsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
      const relevantRecords = apiData.slice(indexOfFirstRecord, indexOfLastRecord);
      setPaginatedData(relevantRecords);
    }
    updatePaginatedData(currentPage);
  }, [apiData, rowsPerPage, currentPage])

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const updateRowsPerPage = (numberOfRows: number) => {
    setRowsPerPage(numberOfRows);
  }

  const totalRows = apiData && apiData.length;

  return (
    <div className="wrapper">
      <SearchForm />
      <Table data={paginatedData} />
      <Pagination totalRows={totalRows} rowsPerPage={rowsPerPage} updateCurrentPage={updateCurrentPage} updateRowsPerPage={updateRowsPerPage} />
    </div>
  );
}

export default App;
