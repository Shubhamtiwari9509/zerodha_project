 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing-page/home/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PricingPage from './landing-page/pricing/PricingPage';
import AboutPage from './landing-page/about/AboutPage';
import ProductsPage from './landing-page/products/ProductsPage';
import Signup from './landing-page/singup/Singup';
import Login from './landing-page/login/Login';
import SupportPage from './landing-page/support/SupportPage';
import PageNotFound from './landing-page/PageNotFound/PageNotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);   
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Login" element={<Login />} />
      <Route path="AboutPage" element={<AboutPage />} />
      <Route path="Products" element={<ProductsPage />} />
      <Route path="Pricing" element={<PricingPage />} />
      <Route path="Support" element={<SupportPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);