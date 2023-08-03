import ActionButtons from "../src/components/generic/ActionButtons";
import DatePicker from "../src/components/generic/DatePicker";
import DateTimeCreatedAt from "../src/components/generic/DateTimeCreatedAt";
import DateTimePicker from "../src/components/generic/DateTimePicker";
import Dropdown from "../src/components/generic/Dropdown";
import MultiSelectBrands from "../src/components/generic/MultiSelectBrands";
import MultiSelectCategory from "../src/components/generic/MultiSelectCategory";
import MultiSelectTags from "../src/components/generic/MultiSelectTags";

const BrandsEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: MultiSelectBrands,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};
const TagsEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: MultiSelectTags,
      popup: true,
      popupPosition: "under",
    };
  }
  return undefined;
};
const CategoryEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: MultiSelectCategory,
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

const dateTimeCreatedEditorSelector = (params: any) => {
  if (params.data) {
    return {
      component: DateTimeCreatedAt,
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
    width: 140,
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
    headerName: "Coupon Code",
    field: "coupon_code",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Checked At",
    field: "checked_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    cellEditorSelector: dateTimeEditorSelector,
  },
  {
    headerName: "Created At",
    field: "created_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    cellEditorSelector: dateTimeCreatedEditorSelector,
  },
  {
    headerName: "Deleted At",
    field: "deleted_at",
    editable: true,
    sortable: true,
    width: 220,
    filter: true,
    // cellEditorSelector: dateTimeEditorSelector,
    cellEditorSelector: dateEditorSelector,
  },
  {
    headerName: "Discount",
    field: "discount",
    sortable: true,
    filter: true,
    editable: true,
    cellClass: (params: any) => {
      return params.value == "Up To 50% Off" ? "bg-red-300" : "bg-transparent";
    },
  },
  {
    headerName: "Applicable On",
    field: "applicable_on",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Applicable on Description",
    field: "applicable_on_desc",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "applicable_on_desc",
  },
  {
    headerName: "Not Applicable On",
    field: "not_applicable_on",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "User Type",
    field: "user_type",
    sortable: true,
    filter: true,
    editable: true,
    width: 140,
    cellEditorSelector: dropdownSelector,
  },
  {
    headerName: "Min Purchase Amt",
    field: "min_purchase",
    sortable: true,
    filter: true,
    width: 200,
    editable: true,
  },
  {
    headerName: "Max Discount",
    field: "max_discount",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Terms",
    field: "terms",
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
    cellEditorSelector: CategoryEditorSelector,
  },
  {
    headerName: "Tags",
    field: "tags",
    sortable: true,
    filter: true,
    editable: true,
    width: 300,
    cellEditorSelector: TagsEditorSelector,
  },
  {
    headerName: "Brands",
    field: "brands",
    sortable: true,
    filter: true,
    editable: true,
    width: 300,
    cellEditorSelector: BrandsEditorSelector,
  },
  // {
  //   headerName: "No Of Brands",
  //   field: "noOfBrands",
  //   sortable: true,
  //   filter: true,
  //   editable: true,
  //   width: 170,
  //   cellClass: (params: any) => {
  //     return params.value === 7 ? "bg-green-300" : "bg-transparent";
  //   },
  // },
  // {
  //   headerName: "Expiry Date",
  //   field: "expiryDate",
  //   sortable: true,
  //   filter: true,
  //   width: 150,
  //   editable: true,
  //   cellEditorSelector: dateEditorSelector,
  // },
  // {
  //   headerName: "Start Date",
  //   field: "startDate",
  //   sortable: true,
  //   filter: true,
  //   editable: true,
  //   width: 150,
  //   cellEditorSelector: dateEditorSelector,
  // },
  // {
  //   headerName: "OfferPage Link",
  //   field: "offerPageLink",
  //   sortable: true,
  //   filter: true,
  //   editable: true,
  // },
  {
    headerName: "Plain Link",
    field: "plain_link",
    sortable: true,
    filter: true,
    editable: true,
  },
  // {
  //   headerName: "Fragment Template",
  //   field: "fragmentTemplate",
  //   sortable: true,
  //   filter: true,
  //   width: 350,
  // },
  // {
  //   headerName: "Generated Title",
  //   field: "generatedTitle",
  //   sortable: true,
  //   filter: true,
  // },
  // {
  //   headerName: "Generated Description",
  //   field: "generatedDescription",
  //   sortable: true,
  //   filter: true,
  //   width: 350,
  // },
  {
    headerName: "Affiliate Link",
    field: "affiliate_link",
    sortable: true,
    filter: true,
    editable: true,
  },

  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "description",
  },
  {
    headerName: "Editor status",
    field: "editor_status",
    sortable: true,
    filter: "agTextColumnFilter",
    editable: true,
  },
  {
    headerName: "Exclusive",
    field: "exclusive",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Link Status",
    field: "link_status",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Lock Column",
    field: "lock_column",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Merchant Id",
    field: "merchant_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Network Id",
    field: "network_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Offer Type",
    field: "offer_type",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Pattern Id",
    field: "pattern_id",
    sortable: true,
    filter: true,
    editable: true,
    cellClass: (params: any) => {
      return params.value == 4 ? "!bg-red-500" : "!bg-transparent";
    },
  },
  {
    headerName: "Network Id",
    field: "network_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Raw Description",
    field: "raw_description",
    sortable: true,
    filter: true,
    editable: true,
    filterParams: {
      showTooltips: true,
    },
    width: 320,
    tooltipField: "raw_description",
  },
  {
    headerName: "Raw Title",
    field: "raw_title",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Rejection Reason",
    field: "rejection_reason",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source",
    field: "source",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Coupon Id",
    field: "source_coupon_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Id",
    field: "source_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Sourced Times",
    field: "sourced_times",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Source Id",
    field: "source_id",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Title",
    field: "title",
    sortable: true,
    filter: true,
    editable: true,
  },
  {
    headerName: "Status",
    field: "status",
    sortable: true,
    filter: true,
    editable: true,
  },
];

export const fetchData = async (
  url: string,
  method = "GET",
  headers = { "Content-type": "application/json" },
  searchValue = ""
) => {
  try {
    const response = await fetch(`${url}`, {
      method: method,
      headers: headers,
    });
    const data = await response.json();
    if (searchValue) {
      return data.data.filter((item: any) => {
        return item.discount.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
