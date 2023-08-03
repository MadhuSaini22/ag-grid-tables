import React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

export default forwardRef((props: any, ref) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(stringToArray(props?.value));
  function stringToArray(str: string): Option[] {
    const values = str?.split(",").map((item) => item.trim());
    const resultArray = values?.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    }));
    return removeDuplicates(resultArray);
  }

  function removeDuplicates(arr: Option[]): Option[] {
    const uniqueValues = new Set<string>();
    return arr?.filter((item) => {
      const key = `${item.value}:${item.label}`.toLowerCase();
      if (!uniqueValues.has(key)) {
        uniqueValues.add(key);
        return true;
      }
      return false;
    });
  }

  useImperativeHandle(ref, () => ({
    getValue: () => selectedOptions.map((item) => item.label).join(", "),
  }));

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(removeDuplicates(selected as Option[]));
  };

  const options: Option[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" },
  ].sort((a, b) => a.label.localeCompare(b.label)); // Sort options alphabetically

  return (
    <div className="mood" tabIndex={1}>
      <Select isMulti options={options} value={selectedOptions} closeMenuOnSelect={false} onChange={handleChange} />
    </div>
  );
});
