import React from "react";
import { config } from "../../config";

export default function LimitSelect({ onChange }: any) {
  return (
    <div className="example-header">
      Page Size:
      <select onChange={onChange} id="page-size">
        {config.limitOptions.map((option: any, index) => (
          <option key={option} value={option} key={index}>
            {option}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}
