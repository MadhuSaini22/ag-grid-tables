import React from "react";

export default function LimitSelect({ onChange }: any) {
  return (
    <div className="example-header">
      Page Size:
      <select onChange={onChange} id="page-size">
        <option value="10">10</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>
  );
}
