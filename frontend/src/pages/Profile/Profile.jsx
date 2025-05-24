import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

import { FaRegCopy, FaHome, FaMoneyBillWave, FaChartLine, FaTags } from 'react-icons/fa';
import { ClipboardCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Получаем данные пользователя из localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser({
                ...userData,
                // Добавляем дефолтные значения для свойств, которых может не быть в API
                wallet: userData.wallet || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                bio: userData.bio || 'Real estate investor',
                owned: userData.owned || [],
                listings: userData.listings || [],
                totalSpent: userData.totalSpent || 0,
                totalValue: userData.totalValue || 0,
                initials: (userData.first_name?.[0] || '') + (userData.last_name?.[0] || '')
            });
        } else {
            navigate('/login'); // Перенаправляем если пользователь не авторизован
        }
        setLoading(false);
    }, [navigate]);

    const copyToClipboard = () => {
        if (!user) return;

        toast(
            <div className="wallet-toast">
                <div className="wallet-toast-icon fade-timer">
                    <ClipboardCheck size={18} className="lucide" />
                </div>
                <span>
                    <strong>Wallet copied!</strong><br />
                    {user.wallet}
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

    if (loading) {
        return <div className="profile-page">Loading...</div>;
    }

    if (!user) {
        return null; // или redirect на login
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
                            </div>

                            <div className="profile-page-info">
                                <h1>{user.first_name} {user.last_name}</h1>
                                <p>{user.bio}</p>
                                <div className="profile-page-wallet" onClick={copyToClipboard}>
                                    <span>{user.wallet}</span>
                                    <FaRegCopy />
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
                            <p className="no-properties">You don't own any properties yet</p>
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
                            <p className="no-properties">You don't have any active listings</p>
                        )}

                        <div
                            className="floating-my-properties"
                            onClick={() => navigate('/properties')}
                        >
                            <span className="icon"></span>
                            <span className="label">Add Properties</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;