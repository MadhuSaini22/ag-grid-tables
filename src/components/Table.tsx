import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MoodEditor from "./MoodEditor";
import DateRef from "./DateRef";
import React from "react";

interface User {
  id: number;
  name: string;
  age: number;
  country: string;
  category: string;
  image: string;
}
const categoryEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: MoodEditor,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};
const dateEditorSelector = (params: any) => {
  console.log({ ffff: params });
  if (params.data) {
    return {
      component: DateRef,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

const columnDefs: any = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  {
    headerName: "Profile",
    field: "image",
    sortable: false,
    filter: false,
    cellRenderer: "imageCellRenderer",
  },
  { headerName: "Name", field: "name", sortable: true, filter: true, editable: true },
  {
    headerName: "Date",
    field: "date",
    editable: true,
    sortable: true,
    filter: true,
    width: 390,
    cellEditorSelector: dateEditorSelector,
  },
  { headerName: "Age", field: "age", sortable: true, filter: true, editable: true },
  {
    headerName: "Category",
    field: "category",
    editable: true,
    sortable: true,
    filter: true,
    width: 390,
    cellEditorSelector: categoryEditorSelector,
  },
  {
    field: "country",
    editable: true,
    cellEditor: "agSelectCellEditor",
    sortable: true,
    filter: true,
    cellEditorPopup: true,
    cellEditorParams: {
      values: ["Ireland", "USA"],
    },
  },
  {
    field: "address",
    editable: true,
    cellEditor: "agLargeTextCellEditor",
    cellEditorPopup: true,
    minWidth: 610,
  },
];



const fetchData = async (currentPage,pageSize) => {
  const newUrl =currentPage&& pageSize?`http://localhost:3000/data?_page=${currentPage}&_limit=${pageSize}`:"http://localhost:3000/data";
 console.log({newUrl})
  try {
    const response = await fetch(newUrl);
    const data = await response.json();
    console.log({data})
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

const fetchInitialData = async () => {
  try {
    const response = await fetch("http://localhost:3000/data");
    const data = await response.json();
    console.log({data},"-------------")
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

const ImageCellRenderer: React.FC<{ value: string }> = ({ value }) => {
  return <img src={value} alt="Profile" width="35" height="35" />;
};

const Table: React.FC = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const gridRef = useRef(null);
  // useEffect(() => {
  //   console.log("first")
  //   fetchData(currentPage,pageSize)
  //     .then((data) => setRowData(data))
  //     .catch((error) => {
  //       console.log({ error });
  //       // Handle error if needed and show an appropriate message to the user
  //     });
  // }, [currentPage,pageSize]);

  const onCellEditingStopped = (params: any) => {
    const { data, column, newValue } = params;
    const updatedData = rowData.map((row) => (row.id === data.id ? { ...row, [column.getColId()]: newValue } : row));

    const updatedUser = updatedData.find((user) => user.id === data.id);
    if (updatedUser) {
      fetch(`http://localhost:3000/data/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
          return response.json();
        })
        .then(() => {
          fetchData(currentPage,pageSize).then((data) => setRowData(data)); // After successful PUT request, fetch the updated data again with a GET request
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error if needed and show an appropriate message to the user
        });
    }
  };
  const paginationNumberFormatter = useCallback((params: any) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);

  const onFirstDataRendered = useCallback(() => {
    //@ts-ignore
    gridRef.current!.api.paginationGoToPage(4);
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement).value;
    //@ts-ignore
    gridRef.current!.api.paginationSetPageSize(Number(value));
  }, []);


  const onPaginationChangedHandler = useCallback((event) => {
    const newPage = event.api.paginationGetCurrentPage() + 1;
    const newPageSize = event.api.paginationGetPageSize();

    setCurrentPage(newPage)
    setPageSize(newPageSize)
    console.log({newPage,newPageSize})
    // if (newPage !== currentPage || newPageSize !== pageSize) {
    //   setCurrentPage(newPage);
    //   setPageSize(newPageSize);
    // }
  }, [currentPage, pageSize]);

console.log({currentPage,pageSize})
  return (
    <div>
      <div className="example-header">
        Page Size:
        <select onChange={onPageSizeChanged} id="page-size">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div className="ag-theme-alpine" style={{ width: "100vw", height: "1000px", fontSize: "20px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellEditingStopped={onCellEditingStopped}
          pagination={true}
          paginationPageSize={10}
          paginationNumberFormatter={paginationNumberFormatter}
          onGridReady={fetchInitialData}
          onFirstDataRendered={onFirstDataRendered}
          rowHeight={75}
          components={{ imageCellRenderer: ImageCellRenderer }}
          onPaginationChanged={onPaginationChangedHandler}
        />
      </div>
    </div>
  );
};

export default Table;
