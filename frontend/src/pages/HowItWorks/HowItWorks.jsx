import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.scss';

const steps = [
    {
        title: "Connect Your Wallet",
        description: "Start by connecting your MetaMask or any compatible Web3 wallet. This ensures secure, decentralized authentication and enables blockchain interactions.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        )
    },
    {
        title: "Discover Real Estate",
        description: "Browse a global marketplace of NFT-tokenized properties. Each listing is transparent, verifiable, and updated in real-time on the blockchain.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
        )
    },
    {
        title: "Buy or Participate in Auctions",
        description: "You can buy properties instantly or place bids in ongoing decentralized auctions. All transactions are handled securely through smart contracts.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }
];

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <div className="container">
                <h2>How It Works</h2>
                <p className="intro-text">
                    Discover a seamless way to own, trade, and auction tokenized real estate. Our 3-step process makes it simple to enter the world of decentralized property investment.
                </p>

                <div className="steps">
                    {steps.map((step, index) => (
                        <div className="step-card" key={index}>
                            <div className="icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="call-to-action">
                    <h3>Interested?</h3>
                    <p>Create your account and connect your wallet to get started today. No middlemen. Full control. Global access.</p>
                    <Link to="/register" className="primary-button">Register & Connect Wallet</Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
