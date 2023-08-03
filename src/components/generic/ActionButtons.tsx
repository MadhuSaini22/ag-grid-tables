import React from "react";
import { ICellRendererParams } from "ag-grid-community";

const actionButtons = {
  not_published: ["Publish", "Trash"],
  rejected: ["Restore ", "Trash "],
  active: ["Trash"],
  expired: ["Trash"],
  stale: ["Trash"],
  trashed: ["Restore"],
  missing: ["Trash"],
  publish: ["Trash"],
  "not expiry": ["Trash"],
};

export default ({ data }: ICellRendererParams) => {
  return (
    <div className="custom-element space-x-3">
      {data &&
        data.status &&
        actionButtons[`publish`].map((button, index) => {
          return (
            <button
              type="button"
              key={index}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                alert(`You clicked ${data.id}`);
              }}
            >
              {button}
            </button>
          );
        })}
    </div>
  );
};
