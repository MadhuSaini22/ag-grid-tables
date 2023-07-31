import * as React from "react";
import "./App.css";
import DatePicker from "./components/generic/DatePicker";
import PaginationComponent from "./components/generic/Pagination";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <PaginationComponent />
      <DatePicker />
    </div>
  );
}

export default App;
