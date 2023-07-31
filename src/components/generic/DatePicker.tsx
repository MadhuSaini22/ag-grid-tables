import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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

  // const handleDivClick = () => {
  //   const dateInput: any = document.getElementById("dateInput");

  //   dateInput && dateInput.showPicker();
  // };

  // useEffect(() => {
  //   handleDivClick();
  //   return () => {};
  // }, []);

  return (
    <div className="absolute">
      <label>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleInputChange}
          placeholder="Enter your date here"
          className="w-[148px] h-9 text-base px-5 outline-none relative shadow-md"
        />
      </label>
    </div>
  );
});

export default DatePicker;
