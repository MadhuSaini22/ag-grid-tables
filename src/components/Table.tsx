import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomTooltip from "./generic/CustomTooltip";
import { ColDef } from "ag-grid-community";
import LimitSelect from "./generic/LimitSelect";
import { columnDefs, fetchData } from "./utils";
import "ag-grid-enterprise";
import { baseUrl } from "../../config";

const truncateCellRenderer: React.FC<any> = ({ value }) => (
  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
);

export default function Table() {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => setRowData(data))
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  useEffect(() => {
    fetchData(searchValue)
      .then((data) => setRowData(data))
      .catch((error) => {
        console.log({ error });
      });
  }, [searchValue]);

  const handleGlobalSearch = useCallback((event: any) => {
    setSearchValue(event.target.value);
  }, []);

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
          fetchData(searchValue).then((data) => setRowData(data));
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
      console.log({ selectedRows });
      const selectedIds = nodesToUpdate.map((node: any) => node.data.id).join(",");

      alert(`You selected ${selectedIds}`);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-start mb-4 space-x-12">
        <LimitSelect onChange={onPageSizeChanged} />
        <input
          type="text"
          placeholder="Search by Offer title..."
          value={searchValue}
          onChange={handleGlobalSearch}
          className="outline-none border border-gray-400 rounded p-1"
        />
        <div style={{ marginBottom: "5px" }}>
          <button onClick={updateSelectedRows}>Update Selected Rows</button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ width: "100vw", height: "900px", fontSize: "17px" }}>
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
          sideBar={true}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          tooltipHideDelay={2000}
          components={{ imageCellRenderer: ImageCellRenderer }}
        />
      </div>
    </div>
  );
}
