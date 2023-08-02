import { baseUrl } from "../../../config";
import ActionButtons from "../generic/ActionButtons";
import DatePicker from "../generic/DatePicker";
import DateTimePicker from "../generic/DateTimePicker";
import Dropdown from "../generic/Dropdown";
import MultiSelect from "../generic/MultiSelect";

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
      component: DateTimePicker,
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
const dropdownSelector = (params: any) => {
  if (params.data) {
    return {
      component: Dropdown,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};

export const columnDefs: any = [
  {
    headerName: "ID",
    field: "id",
    sortable: true,
    filter: true,
    width: 90,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },
  {
    headerName: "Action",
    field: "action",
    sortable: false,
    filter: false,
    cellRenderer: ActionButtons,
    editable: false,
  },
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
    cellEditorSelector: dropdownSelector,
  },
  {
    headerName: "Discount Type",
    field: "DiscountType",
    sortable: true,
    filter: true,
    width: 180,
    editable: true,
    cellEditorSelector: dropdownSelector,
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
    cellClass: (params: any) => {
      return params.value === 7 ? "bg-green-300" : "bg-transparent";
    },
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

export const fetchData = async (searchValue = "") => {
  try {
    const response = await fetch(`${baseUrl}`);
    const data = await response.json();
    if (searchValue) {
      return data.filter((item: any) => item.offerTitle.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
