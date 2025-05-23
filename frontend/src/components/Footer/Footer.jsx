import React from 'react';
import './Footer.scss';

const Footer = () => {
    const links = {
        marketplace: [
            { text: 'All Properties', url: '#' },
            { text: 'Buy', url: '#' },
            { text: 'Sell', url: '#' },
            { text: 'Auctions', url: '#' },
            { text: 'Price Trends', url: '#' }
        ],
        resources: [
            { text: 'How It Works', url: '#' },
            { text: 'NFT Guide', url: '#' },
            { text: 'Legal Framework', url: '#' },
            { text: 'FAQ', url: '#' },
            { text: 'Blog', url: '#' }
        ],
        company: [
            { text: 'About Us', url: '#' },
            { text: 'Team', url: '#' },
            { text: 'Careers', url: '#' },
            { text: 'Contact', url: '#' },
            { text: 'Press', url: '#' }
        ]
    };

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <a href="#" className="footer-logo">d<span>EST</span></a>
                        <p>Decentralized Estate platform revolutionizing real estate transactions through blockchain technology and NFT ownership.</p>
                        <div className="social-links">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Marketplace</h4>
                        <ul>
                            {links.marketplace.map((link, index) => (
                                <li key={index}><a href={link.url}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            {links.resources.map((link, index) => (
                                <li key={index}><a href={link.url}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Company</h4>
                        <ul>
                            {links.company.map((link, index) => (
                                <li key={index}><a href={link.url}>{link.text}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2023 dEST. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
