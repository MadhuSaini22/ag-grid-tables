import * as React from "react";
import "./App.css";
import MerchantsView from "./components/generic/MerchantsView";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/generic/Merchant";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MerchantsView />} />
        <Route path="/merchant/:merchantId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
