import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useMemo, useRef } from "react";
import MultiSelect from "./generic/MultiSelect";
import DateRef from "./generic/DateRef";
import CustomTooltip from "./generic/CustomTooltip";
import { ColDef } from "ag-grid-community";
import DatePicker from "./generic/DatePicker";

const categoryEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: MultiSelect,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

const dateTimeEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: DateRef,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

const dateEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: DatePicker,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

const truncateCellRenderer: React.FC<any> = ({ value }) => (
  <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
);
export default function Table({ rowData, setData, currentPage, limit }: any) {
  const gridRef = useRef(null);

  const columnDefs: any = [
    { headerName: "ID", field: "id", sortable: true, filter: true, width: 90 },
    {
      headerName: "Offer Title",
      field: "offerTitle",
      sortable: true,
      filter: true,
      editable: true,
      tooltipField: "offerTitle",
    },
    {
      headerName: "Offer Description",
      field: "offerDescription",
      sortable: true,
      filter: true,
      editable: true,
      filterParams: {
        showTooltips: true,
      },
      width: 320,
      tooltipField: "offerDescription",
    },
    {
      headerName: "Coupon Code",
      field: "couponCode",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Expire Date",
      field: "expireDate",
      editable: true,
      sortable: true,
      width: 220,
      filter: true,
      cellEditorSelector: dateTimeEditorSelector,
    },
    {
      headerName: "OfferPage Redirect Link",
      field: "offerPageRedirectLink",
      sortable: true,
      filter: true,
      editable: true,
      width: 260,
    },
    {
      headerName: "Discount",
      field: "discount",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Applicable On",
      field: "applicableOn",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Not Applicable On",
      field: "notApplicableOn",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "User Type",
      field: "userType",
      sortable: true,
      filter: true,
      editable: true,
      width: 140,
      cellEditor: "agSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: ["Existing", "All", "New"],
      },
    },
    {
      headerName: "Discount Type",
      field: "DiscountType",
      sortable: true,
      filter: true,
      width: 180,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: ["Discount", "Cashback"],
      },
    },
    {
      headerName: "Min Purchase Amt",
      field: "minimumPurchaseAmount",
      sortable: true,
      filter: true,
      width: 200,
      editable: true,
    },
    {
      headerName: "Payment Mode",
      field: "paymentMode",
      sortable: true,
      editable: true,
      filter: true,
      width: 180,
    },
    {
      headerName: "Max Discount",
      field: "maximumDiscount",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Extra Terms",
      field: "extraTerms",
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      minWidth: 310,
    },
    {
      headerName: "Categories",
      field: "categories",
      sortable: true,
      filter: true,
      editable: true,
      width: 300,
      cellEditorSelector: categoryEditorSelector,
    },
    {
      headerName: "Tags",
      field: "tags",
      sortable: true,
      filter: true,
      editable: true,
      width: 300,
      cellEditorSelector: categoryEditorSelector,
    },
    {
      headerName: "Brands",
      field: "brands",
      sortable: true,
      filter: true,
      editable: true,
      width: 300,
      cellEditorSelector: categoryEditorSelector,
    },
    {
      headerName: "No Of Brands",
      field: "noOfBrands",
      sortable: true,
      filter: true,
      editable: true,
      width: 170,
    },
    {
      headerName: "Expiry Date",
      field: "expiryDate",
      sortable: true,
      filter: true,
      width: 150,
      editable: true,
      cellEditorSelector: dateEditorSelector,
    },
    {
      headerName: "Start Date",
      field: "startDate",
      sortable: true,
      filter: true,
      editable: true,
      width: 150,
      cellEditorSelector: dateEditorSelector,
    },
    {
      headerName: "OfferPage Link",
      field: "offerPageLink",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Plain Link",
      field: "plainLink",
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: "Fragment Template",
      field: "fragmentTemplate",
      sortable: true,
      filter: true,
      width: 350,
    },
    {
      headerName: "Generated Title",
      field: "generatedTitle",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Generated Description",
      field: "generatedDescription",
      sortable: true,
      filter: true,
      width: 350,
    },
  ];

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

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/data?_page=${currentPage}&_limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  };

  const onCellEditingStopped = (params: any) => {
    const { data, column, newValue } = params;
    const updatedData = rowData.map((row: any) =>
      row.id === data.id ? { ...row, [column.getColId()]: newValue } : row
    );

    const updatedUser = updatedData.find((user: any) => user.id === data.id);
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
          fetchData().then((data) => setData(data));
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
  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: "100vw", height: "1000px", fontSize: "17px" }}>
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellEditingStopped={onCellEditingStopped}
          rowHeight={75}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          components={{ imageCellRenderer: ImageCellRenderer }}
        />
      </div>
    </div>
  );
}
