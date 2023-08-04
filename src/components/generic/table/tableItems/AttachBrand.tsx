import React, { forwardRef, useImperativeHandle, useState } from "react";
import { config } from "../../../../config";
import PrimaryButton from "../../../core/PrimaryButton";
import SelectDropdown from "../../SelectDropdown";

const AttachBrand = forwardRef((props: any, ref) => {
  const [selectedValue, setSelectedValue] = useState(props.value);
  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }));

  return (
    <div className="example-header flex space-x-3">
      <SelectDropdown onChange={handleInputChange} label={""} options={config.usersTypeOptions} id={"page-size"} />
      <PrimaryButton label={"action"} onClick={() => alert(`You clicked ${selectedValue}`)} />
    </div>
  );
});

export default AttachBrand;
