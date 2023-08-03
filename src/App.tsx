import * as React from "react";
import "./App.css";
import MerchantsView from "./pages/MerchantsView";
import { Routes, Route } from "react-router-dom";
import Merchant from "./pages/Merchant";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MerchantsView />} />
        <Route path="/merchant/:merchantId" element={<Merchant />} />
      </Routes>
    </div>
  );
}

export default App;
