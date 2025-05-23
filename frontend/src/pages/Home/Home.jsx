import React, { useEffect } from 'react';
import './Home.scss';
import Countries from '../../components/Countries/Countries';
import { Link } from 'react-router-dom'

const Home = () => {
    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
            ),
            title: "Direct Ownership",
            description: "Property ownership is tokenized as NFTs, eliminating intermediaries and reducing costs."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
            ),
            title: "Secure Transactions",
            description: "All transactions are recorded on-chain, offering immutable proof of ownership and transfer."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            ),
            title: "24/7 Auctions",
            description: "Buy, sell, or auction properties anytime — no traditional market hours required."
        }
    ];

    // 👇 Animated counters
    useEffect(() => {
        const animateValue = (el, start, end, duration) => {
            let startTimestamp = null;
            const isMillion = el.getAttribute("data-million") === "true";
            const suffix = el.getAttribute("data-suffix") || "";

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);

                if (isMillion) {
                    el.innerText = current.toLocaleString() + "M+";
                } else {
                    el.innerText = suffix === "%" ? current + "%" : "" + current.toLocaleString();
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        };

        document.querySelectorAll(".stat-number").forEach(el => {
            const value = parseInt(el.getAttribute("data-value"), 10);
            const suffix = el.innerText.includes("%") ? "%" : "";
            const isMillion = el.getAttribute("data-million") === "true";

            el.setAttribute("data-suffix", suffix);
            if (isMillion) {
                el.innerText = "0M+";
            } else {
                el.innerText = suffix ? "0%" : "0+";
            }

            animateValue(el, 0, value, 1200);
        });
    }, []);



    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>Decentralized <span>Estate</span> Trading</h1>
                    <p>Buy, sell, and auction properties directly using NFT technology. Powered by Ethereum blockchain in compliant jurisdictions.</p>
                    <div className="cta-buttons">
                        <Link to="/marketplace" className="primary-button">Explore Properties</Link>
                        <Link to="/how-it-works" className="secondary-button">How It Works</Link>
                    </div>
                    <div className="ethereum-badge">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="currentColor"/>
                        </svg>
                        <span>Powered by Ethereum</span>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <div className="stat-number" data-value="22" data-million="true">0M+</div>
                            <div className="stat-label">Property</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-number" data-value="120">0</div>
                            <div className="stat-label">Properties</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number" data-value="90">0%</div>
                            <div className="stat-label">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-intro">
                <div className="container">
                    <div className="section-header">
                        <h2>Revolutionizing Real Estate</h2>
                        <p>We’re leveraging NFT technology to create a transparent and efficient property marketplace.</p>
                    </div>
                    <div className="feature-cards">
                        {features.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <Countries />
                </div>
            </section>
        </>
    );
};

export default Home;
