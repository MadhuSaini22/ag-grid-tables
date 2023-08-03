import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomTooltip from "./CustomTooltip";
import { ColDef } from "ag-grid-community";
import LimitSelect from "./LimitSelect";
import { columnDefs, fetchData } from "../../../utils";
import "ag-grid-enterprise";
import { baseUrl, merchantBaseURL, token } from "../../../config";

const truncateCellRenderer: React.FC<any> = ({ value }) => (
  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
);

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

export default function Table({ rowData, setRowData, merchantId }: any) {
  const gridRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  // State to store the grid API reference
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData(`${merchantBaseURL}${merchantId}`, "GET", headers, searchValue)
      .then((data) => {
        searchValue ? setRowData(data) : setRowData(data.data);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [searchValue]);

  const handleGlobalSearch = useCallback((event: any) => {
    setSearchValue(event.target.value);
  }, []);

  // Apply default filter on Age column (age = 30)
  useEffect(() => {
    if (gridApi) {
      //@ts-ignore
      const filterInstance = gridApi.getFilterInstance("editor_status");
      if (filterInstance) {
        filterInstance.setModel({
          type: "equals",
          filter: "not_published", // Default filter value
        });
        //@ts-ignore
        gridApi.onFilterChanged();
      }
    }
  }, [gridApi]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
      tooltipComponent: CustomTooltip,
      cellRenderer: truncateCellRenderer,
    };
  }, []);

  const onCellEditingStopped = (params: any) => {
    const { data, column, newValue } = params;
    const updatedData = rowData.map((row: any) =>
      row.id === data.id ? { ...row, [column.getColId()]: newValue } : row
    );

    const updatedUser = updatedData.find((user: any) => user.id === data.id);
    if (updatedUser) {
      fetch(`${baseUrl}/${data.id}`, {
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
          fetchData(`${merchantBaseURL}${merchantId}`, "GET", headers, searchValue).then((data) => setRowData(data));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error if needed and show an appropriate message to the user
        });
    }
  };

  const ImageCellRenderer: React.FC<{ value: string }> = ({ value }) => {
    return <img src={value} alt="Profile" width="35" height="35" />;
  };

  const onPageSizeChanged = useCallback(() => {
    var value = (document.getElementById("page-size") as HTMLInputElement).value;
    //@ts-ignore
    gridRef.current!.api.paginationSetPageSize(Number(value));
  }, []);

  const updateSelectedRows = useCallback(() => {
    //@ts-ignore
    let nodesToUpdate = gridRef.current!.api.getSelectedNodes();
    if (nodesToUpdate.length > 0) {
      setSelectedRows(nodesToUpdate);
      const selectedIds = nodesToUpdate.map((node: any) => node.data.id).join(",");

      alert(`You selected ${selectedIds}`);
    }
  }, [gridRef]);

  return (
    <div>
      <div className="flex items-center justify-start mb-4 flex-col sm:flex-row space-x-12 space-y-4 sm:space-y-0">
        <LimitSelect onChange={onPageSizeChanged} />
        <div>
          <input
            type="text"
            placeholder="Search by Offer title..."
            value={searchValue}
            onChange={handleGlobalSearch}
            className="outline-none border border-gray-400 rounded p-1"
          />
        </div>

        <div style={{ marginBottom: "5px" }}>
          <button onClick={updateSelectedRows}>Update Selected Rows</button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ width: "98vw", height: "84vh", fontSize: "17px" }}>
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellEditingStopped={onCellEditingStopped}
          rowHeight={75}
          pagination={true}
          paginationPageSize={10}
          tooltipShowDelay={0}
          animateRows={true}
          sideBar={true}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          tooltipHideDelay={2000}
          onGridReady={(params: any) => setGridApi(params.api)}
          components={{ imageCellRenderer: ImageCellRenderer }}
        />
      </div>
    </div>
  );
}
