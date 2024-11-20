import React, { useEffect, useState } from "react";
import "./App.css"; 

const PaginationApp = () => {
  const [data, setData] = useState([]); // Store employee data
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [error, setError] = useState(false); // Error state for API failure
  const rowsPerPage = 10; // Number of rows per page

  // Fetch employee data from API on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) throw new Error("API fetch failed");

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(true);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice data for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  // Handlers for navigation buttons
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination-app">
      <h1>Employee Data</h1>
      {error ? (
        <p className="error-text">Failed to load data</p>
      ) : (
        <>
          {/* Table to display employee data */}
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="controls-Pagination">
            <button
              onClick={handlePrevious}
              
              className="pagination-button"
            >
              Previous
            </button>

            <span className="pagination-information">
               {currentPage} 
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
            
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationApp;
