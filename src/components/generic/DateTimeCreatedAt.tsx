import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function convertToISOString(inputDate: any) {
  const dateObj = new Date(inputDate);
  return dateObj.toISOString();
}

const DateTimeCreatedAt = forwardRef((props, ref) => {
  //@ts-ignore
  const [selectedDateTime, setSelectedDateTime] = useState(new Date(props.data.created_at).toLocaleString());

  const handleDateTimeChange = (momentObj: any) => {
    setSelectedDateTime(momentObj.toDate());
  };

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    getValue: () => convertToISOString(selectedDateTime),
  }));

  useEffect(() => {
    const dateInput: any = document?.querySelector(".form-control");
    if (dateInput) {
      dateInput.click();
    }
  }, []);

  return <Datetime value={selectedDateTime} onChange={handleDateTimeChange} className="w-52" />;
});

export default DateTimeCreatedAt;
