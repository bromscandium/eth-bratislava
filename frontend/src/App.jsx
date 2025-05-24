import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Auction from './pages/Auction/Auction';
import Trade from './pages/Trade/Trade';
import ResultBuying from './pages/ResultBuying/ResultBuying';
import WalletConnect from './pages/WalletConnect/WalletConnect';
import Marketplace from "./pages/Marketplace/Marketplace";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Register from './pages/Register/Register';
import "./styles/index.scss"
import Properties from "./pages/Propform/Propform";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout() {
    const location = useLocation();
    const noLayoutRoutes = ['/login', '/register'];
    const hideLayout = noLayoutRoutes.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!hideLayout && <Header />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/marketplace/:filter" element={<Marketplace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auction/:id" element={<Auction />} />
                    <Route path="/trade/:id" element={<Trade />} />
                    <Route path="/result" element={<ResultBuying />} />
                    <Route path="/wallet" element={<WalletConnect />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/properties" element={<Properties />} />


                </Routes>
            </main>

            {!hideLayout && <Footer />}

            {/* 🔔 Toast notification with animated border */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                theme="dark"
                toastClassName="wallet-toast-wrapper"
                bodyClassName="wallet-toast"
            />

        </div>
    );
}

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
