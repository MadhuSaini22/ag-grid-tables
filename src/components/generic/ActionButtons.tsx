import React from "react";
import { ICellRendererParams } from "ag-grid-community";

export default ({ data }: ICellRendererParams) => {
  return (
    <div className="custom-element space-x-3">
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          alert(`You clicked ${data.id}`);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Delete
      </button>
    </div>
  );
};
