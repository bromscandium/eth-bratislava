import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

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

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/how-it-works" element={<HowItWorks />}/>

                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/marketplace/:filter" element={<Marketplace />} />

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile/>}/>

                        <Route path="/auction/:id" element={<Auction />} />
                        <Route path="/trade/:id" element={<Trade />} />

                        <Route path="/result" element={<ResultBuying/>}/>
                        <Route path="/wallet" element={<WalletConnect/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;
