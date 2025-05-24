import React from 'react';
import './Hero.scss';

const Hero = () => {
    return (
        <section className="hero">
            <h1>Decentralized <span>Estate</span> Trading</h1>
            <p>Buy, sell, and auction properties directly using NFT technology. Powered by Ethereum blockchain in compliant jurisdictions.</p>
            <div className="cta-buttons">
                <a href="#" className="primary-button">Explore Properties</a>
                <a href="#" className="secondary-button">How It Works</a>
            </div>
            <div className="ethereum-badge">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="currentColor"/>
                </svg>
                <span>Powered by Ethereum</span>
            </div>
            <div className="stats">
                <div className="stat-item">
                    <div className="stat-number">$42M+</div>
                    <div className="stat-label">Total Volume</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">1,240+</div>
                    <div className="stat-label">Properties</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Success Rate</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;