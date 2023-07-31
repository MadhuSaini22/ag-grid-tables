import React, { forwardRef, useImperativeHandle, useState } from "react";
const inputFormateDate = (inputDate: any) => inputDate?.split("-").reverse().join("-");

const DatePicker = forwardRef((props: any, ref) => {
  const [selectedDate, setSelectedDate] = useState(inputFormateDate(props.value));

  const handleInputChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => outPutFormateDate(selectedDate),
  }));
  const outPutFormateDate = (inputDate: any) => inputDate?.split("-").reverse().join("-");

  return (
    <div>
      <label>
        <input type="date" value={selectedDate} onChange={handleInputChange} placeholder="Enter your data here" />
      </label>
    </div>
  );
});

export default DatePicker;
