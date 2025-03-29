import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CustomNavbar from './components/common/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingConfirmation from './pages/BookingConfirmation';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './pages/Footer';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default App;