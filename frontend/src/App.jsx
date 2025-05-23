import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Auction from './pages/Auction/Auction';
import Trade from './pages/Trade/Trade';
import ResultBuying from './pages/ResultBuying/ResultBuying';
import WalletConnect from './pages/WalletConnect/WalletConnect';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/auction" element={<Auction />} />
                        <Route path="/trade" element={<Trade />} />
                        <Route path="/result" element={<ResultBuying />} />
                        <Route path="/wallet" element={<WalletConnect />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
