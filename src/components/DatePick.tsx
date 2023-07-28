import * as React from "react";
import { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const DateTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const handleDateTimeChange = (momentObj: any) => {
    setSelectedDateTime(momentObj.toDate());
  };

  return (
    <div>
      <h2>Select Date and Time</h2>
      <Datetime value={selectedDateTime} onChange={handleDateTimeChange} />
    </div>
  );
};

export default DateTimePicker;
