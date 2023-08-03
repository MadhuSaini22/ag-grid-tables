import React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

export default forwardRef((props: any, ref) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    Array.isArray(props.value)
      ? props.value.map((item: any) => ({ value: String(item), label: String(item) }))
      : [
          {
            value: props.value,
            label: props.value,
          },
        ]
  );

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
    { value: "11003", label: "11003" },
    { value: "11000", label: "11000" },
    { value: "11000", label: "11000" },
    { value: "11006", label: "11006" },
    { value: "12000", label: "12000" },
    { value: "12001", label: "12001" },
    { value: "10000", label: "10000" },
    { value: "15001", label: "15001" },
    { value: "15002", label: "15002" },
    { value: "15003", label: "15003" },
    { value: "15004", label: "15004" },
    { value: "15009", label: "15009" },
    { value: "15000", label: "15000" },
    { value: "11006", label: "11006" },
  ].sort((a, b) => a.label.localeCompare(b.label)); // Sort options alphabetically

  return (
    <div className="mood" tabIndex={1}>
      <Select isMulti options={options} value={selectedOptions} closeMenuOnSelect={false} onChange={handleChange} />
    </div>
  );
});
