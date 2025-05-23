import React from 'react';
import './Home.scss';

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

    return (
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
            </div>
        </section>
    );
};

export default Home;
