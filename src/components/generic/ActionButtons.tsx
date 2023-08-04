import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { config } from "../../config";
import PrimaryButton from "../core/PrimaryButton";

export default ({ data }: ICellRendererParams) => {
  return (
    <div className="custom-element space-x-3">
      {data &&
        data.editor_status &&
        //@ts-ignore
        config.actionButtons[`${data.editor_status}`].map((button: any, index: any) => {
          return (
            <PrimaryButton
              label={button}
              key={button}
              onClick={() => {
                alert(`You clicked ${data.id}`);
              }}
            />
          );
        })}
    </div>
  );
};
