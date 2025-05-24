import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

import { FaRegCopy, FaHome, FaMoneyBillWave, FaChartLine, FaTags, FaEthereum } from 'react-icons/fa';
import { ClipboardCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            const savedWallet = localStorage.getItem('walletAddress');
            const wallet = savedWallet || userData.wallet || '';

            setUser({
                ...userData,
                wallet,
                bio: userData.bio || 'Real estate investor',
                owned: userData.owned || [],
                listings: userData.listings || [],
                totalSpent: userData.totalSpent || 0,
                totalValue: userData.totalValue || 0,
                initials: (userData.first_name?.[0] || '') + (userData.last_name?.[0] || '')
            });

            if (savedWallet) {
                setWalletAddress(savedWallet);
                setWalletConnected(true);
            }
        } else {
            navigate('/login');
        }
        setLoading(false);

        // Проверяем изменение аккаунтов в MetaMask
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else if (walletConnected) {
                    setWalletAddress(accounts[0]);
                    localStorage.setItem('walletAddress', accounts[0]);
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
            }
        };
    }, [navigate, walletConnected]);

    const connectMetaMask = async () => {
        if (!window.ethereum) {
            toast.error(
                <div>
                    <strong>MetaMask not installed!</strong>
                    <div>Please install the MetaMask extension.</div>
                </div>,
                { autoClose: 5000 }
            );
            return;
        }

        try {
            // Проверяем сеть (пример для Ethereum Mainnet)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== '0x1') {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x1' }],
                    });
                } catch (switchError) {
                    toast.error('Please switch to Ethereum Mainnet');
                    return;
                }
            }

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const address = accounts[0];
            setWalletAddress(address);
            setWalletConnected(true);

            localStorage.setItem('walletAddress', address);

            const updatedUser = {
                ...user,
                wallet: address
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success(
                <div>
                    <strong>Wallet connected!</strong>
                    <div>{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</div>
                </div>
            );
        } catch (error) {
            toast.error(
                <div>
                    <strong>Connection failed</strong>
                    <div>{error.message}</div>
                </div>
            );
        }
    };

    const disconnectWallet = () => {
        setWalletAddress('');
        setWalletConnected(false);
        localStorage.removeItem('walletAddress');

        const updatedUser = {
            ...user,
            wallet: ''
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        toast.info('Wallet disconnected');
    };

    const copyToClipboard = () => {
        if (!walletAddress) return;

        navigator.clipboard.writeText(walletAddress);
        toast(
            <div className="wallet-toast">
                <div className="wallet-toast-icon fade-timer">
                    <ClipboardCheck size={18} className="lucide" />
                </div>
                <span>
                    <strong>Wallet copied!</strong><br />
                    {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                </span>
            </div>,
            {
                icon: false,
                hideProgressBar: true,
                autoClose: 3000,
                className: 'wallet-toast-wrapper'
            }
        );
    };

    const formatWalletAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    if (loading) {
        return (
            <div className="profile-page loading">
                <div className="loader"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-page-wrapper">
                <div className="profile-page-container">
                    <section className="profile-page-section">
                        <div className="profile-page-header">
                            <div className="profile-page-avatar-wrapper">
                                <div className="profile-page-avatar">
                                    {user.initials}
                                </div>
                                {walletConnected && (
                                    <div className="wallet-badge">
                                        <FaEthereum />
                                    </div>
                                )}
                            </div>

                            <div className="profile-page-info">
                                <h1>{user.first_name} {user.last_name}</h1>
                                <p>{user.bio}</p>

                                <div className="wallet-section">
                                    {walletConnected ? (
                                        <div className="wallet-connected">
                                            <div className="wallet-address" onClick={copyToClipboard}>
                                                <FaEthereum className="eth-icon" />
                                                <span>{formatWalletAddress(walletAddress)}</span>
                                                <FaRegCopy className="copy-icon" />
                                            </div>
                                            <button
                                                className="disconnect-wallet"
                                                onClick={disconnectWallet}
                                            >
                                                Disconnect
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="connect-wallet"
                                            onClick={connectMetaMask}
                                        >
                                            <FaEthereum className="eth-icon" />
                                            Connect MetaMask
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="profile-page-stats">
                            <div className="profile-page-stat-card">
                                <FaHome className="profile-page-stat-icon" />
                                <div className="profile-page-stat-value">{user.owned.length}</div>
                                <div className="profile-page-stat-label">Properties Owned</div>
                            </div>
                            <div className="profile-page-stat-card">
                                <FaMoneyBillWave className="profile-page-stat-icon" />
                                <div className="profile-page-stat-value">{user.totalSpent} USDC</div>
                                <div className="profile-page-stat-label">Total Spent</div>
                            </div>
                            <div className="profile-page-stat-card">
                                <FaChartLine className="profile-page-stat-icon" />
                                <div className="profile-page-stat-value">{user.totalValue} USDC</div>
                                <div className="profile-page-stat-label">Total Value</div>
                            </div>
                            <div className="profile-page-stat-card">
                                <FaTags className="profile-page-stat-icon" />
                                <div className="profile-page-stat-value">{user.listings.length}</div>
                                <div className="profile-page-stat-label">Active Listings</div>
                            </div>
                        </div>

                        <h2 className="profile-page-section-title">My Properties</h2>
                        {user.owned.length > 0 ? (
                            <div className="profile-page-properties-grid">
                                {user.owned.map((property) => (
                                    <div className="profile-page-property-card" key={property.id}>
                                        <div className="profile-page-property-image" style={{ backgroundImage: `url(${property.image})` }}>
                                            <div className="profile-page-property-badge owned">Owned</div>
                                        </div>
                                        <div className="profile-page-property-details">
                                            <div className="profile-page-property-price">
                                                <img src={property.currencyIcon} alt="USDC" width={16} />
                                                {property.price}
                                            </div>
                                            <h3 className="profile-page-property-title">{property.title}</h3>
                                            <div className="profile-page-property-location">{property.location}</div>
                                            <div className="profile-page-property-features">
                                                <div className="profile-page-feature">
                                                    <span>{property.area}</span>
                                                    <span>Area</span>
                                                </div>
                                                <div className="profile-page-feature">
                                                    <span>{property.beds}</span>
                                                    <span>Beds</span>
                                                </div>
                                                <div className="profile-page-feature">
                                                    <span>{property.bath}</span>
                                                    <span>Bath</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-items">
                                <p>You don't own any properties yet</p>
                                <button
                                    className="browse-button"
                                    onClick={() => navigate('/marketplace')}
                                >
                                    Browse Marketplace
                                </button>
                            </div>
                        )}

                        <h2 className="profile-page-section-title">Active Listings</h2>
                        {user.listings.length > 0 ? (
                            <div className="profile-page-properties-grid">
                                {user.listings.map((listing) => (
                                    <div className="profile-page-property-card" key={listing.id}>
                                        <div className="profile-page-property-image" style={{ backgroundImage: `url(${listing.image})` }}>
                                            <div className="profile-page-property-badge">For Sale</div>
                                        </div>
                                        <div className="profile-page-property-details">
                                            <div className="profile-page-property-price">
                                                <img src={listing.currencyIcon} alt="USDC" width={16} />
                                                {listing.price}
                                            </div>
                                            <h3 className="profile-page-property-title">{listing.title}</h3>
                                            <div className="profile-page-property-location">{listing.location}</div>
                                            <div className="profile-page-property-features">
                                                <div className="profile-page-feature">
                                                    <span>{listing.area}</span>
                                                    <span>Area</span>
                                                </div>
                                                <div className="profile-page-feature">
                                                    <span>{listing.beds}</span>
                                                    <span>Beds</span>
                                                </div>
                                                <div className="profile-page-feature">
                                                    <span>{listing.bath}</span>
                                                    <span>Bath</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-items">
                                <p>You don't have any active listings</p>
                                {user.owned.length > 0 && (
                                    <button
                                        className="create-listing-button"
                                        onClick={() => navigate('/create-listing')}
                                    >
                                        Create New Listing
                                    </button>
                                )}
                            </div>
                        )}

                        <div
                            className="floating-action-button"
                            onClick={() => navigate('/properties')}
                        >
                            <span className="icon">+</span>
                            <span className="label">Add Property</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;