import React, { useState, useEffect } from "react";
import LimitSelect from "./LimitSelect";
import Table from "../Table";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const PaginationComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchInitialData();
    return () => {};
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response: any = await fetch(`http://localhost:3000/data?_page=${currentPage}&_limit=${limit}`);
      const data = await response.json();

      setRowData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInitialData = async () => {
    try {
      const response: any = await fetch(`http://localhost:3000/data`);
      const data = await response.json();

      setRowData(data);

      // Get total count of data to calculate total pages
      setTotalPages(Math.ceil(data.length / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);
  const handleNextPage = () => handlePageChange(currentPage + 1);
  const handlePreviousPage = () => handlePageChange(currentPage - 1);

  const paginationButtons = [
    { icon: ChevronDoubleLeftIcon, onClick: handleFirstPage },
    { icon: ChevronLeftIcon, onClick: handlePreviousPage },
    { icon: ChevronRightIcon, onClick: handleNextPage },
    { icon: ChevronDoubleRightIcon, onClick: handleLastPage },
  ];
  return (
    <div style={{ width: "100vw", minHeight: "100vh", fontSize: "20px" }}>
      <LimitSelect
        onChange={(e: any) => {
          setLimit(e.target.value);
          setCurrentPage(1);
        }}
      />
      <Table rowData={rowData} setData={setRowData} currentPage={currentPage} limit={limit} />
      <div className="mt-5 flex items-center justify-between mx-12">
        <div>
          Showing Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-3">
          {paginationButtons.map((button, index) => (
            <PaginationButton key={index} icon={button.icon} onClick={button.onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;

const PaginationButton = ({ icon: Icon, onClick }: any) => (
  <button
    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
  </button>
);
