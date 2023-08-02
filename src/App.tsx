import * as React from "react";
import "./App.css";
import Table from "./components/Table";
import MerchantsView from "./components/MerchantsView";
import { Routes, Route, Link } from 'react-router-dom';
import UserDetails from "./components/UserDetails";
function App() {
  return (
    <div style={{ width: "100vw" }}>
      {/* <Table /> */}
      {/* <MerchantsView /> */}
      <Routes>
        <Route path="merchant/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
