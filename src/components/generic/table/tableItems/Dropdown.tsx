import React, { forwardRef, useImperativeHandle, useState } from "react";

const Dropdown = forwardRef((props: any, ref) => {
  const [selectedValue, setSelectedValue] = useState(props.value);

  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }));

  return (
    <div className="example-header">
      <select onChange={handleInputChange} id="page-size" className="w-32 h-9 text-base px-5 outline-none">
        <option className="h-11 text-base px-5 py-3" value="">
          Select
        </option>
        <option className="h-11 text-base px-5 py-3" value="all">
          All
        </option>
        <option className="h-11 text-base px-5 py-3" value="new">
          New
        </option>
        <option className="h-11 text-base px-5 py-3" value="existing">
          Existing
        </option>
      </select>
    </div>
  );
});

export default Dropdown;
