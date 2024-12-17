import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login'
import SignUp from './screens/SignUp';
import { CardProvider } from './componants/ContextReducer';
import MyOrders from './screens/MyOrders';
import Services from './screens/Services';
import React from 'react';

function App() {
  return (
    <CardProvider>
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<SignUp />} />
        <Route path="/services" element={<Services />} />
        <Route path="/myOrder" element={<MyOrders />} />
      </Routes>
    </Router>
    </CardProvider>
  );
}

export default App;
