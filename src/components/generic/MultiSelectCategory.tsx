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
    { value: "1001", label: "1001" },
    { value: "1100", label: "1100" },
    { value: "1110", label: "1110" },
    { value: "1000", label: "1000" },
    { value: "1010", label: "1010" },
    { value: "1007", label: "1007" },
    { value: "1008", label: "1008" },
    { value: "1002", label: "1002" },
    { value: "1004", label: "1004" },
    { value: "1005", label: "1005" },
    { value: "1002", label: "1002" },
    { value: "1003", label: "1003" },
    { value: "1004", label: "1004" },
  ].sort((a, b) => a.label.localeCompare(b.label)); // Sort options alphabetically

  return (
    <div className="mood" tabIndex={1}>
      <Select isMulti options={options} value={selectedOptions} closeMenuOnSelect={false} onChange={handleChange} />
    </div>
  );
});
