import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhoneList from "./pages/PhoneList";
import PhoneDetail from "./pages/PhoneDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PhoneList />} />
        <Route path="/phones/:id" element={<PhoneDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
