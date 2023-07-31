import React, { forwardRef, useImperativeHandle, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const formatDate = (inputDate: any) => {
  const dateObj = new Date(inputDate);
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};

const parseDate = (inputString: any) => {
  const options: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const dateObj = new Date(inputString);
  return dateObj.toLocaleString("en-US", options);
};

const DateTimePicker = forwardRef((props, ref) => {
  //@ts-ignore
  const [selectedDateTime, setSelectedDateTime] = useState(parseDate(props?.data?.date || new Date()));

  const handleDateTimeChange = (momentObj: any) => {
    setSelectedDateTime(momentObj.toDate());
  };

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    getValue: () => formatDate(selectedDateTime),
  }));

  return <Datetime value={selectedDateTime} onChange={handleDateTimeChange} />;
});

export default DateTimePicker;
