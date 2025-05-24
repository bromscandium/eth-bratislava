import React, { useState } from 'react';
import './Profile.scss';

import { FaRegCopy, FaHome, FaMoneyBillWave, FaChartLine, FaTags } from 'react-icons/fa';
import { ClipboardCheck } from 'lucide-react';
import { toast } from 'react-toastify';

import { users } from '../../data/profile';

const Profile = () => {
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const user = users[selectedUserIndex];

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const selectUser = (index) => {
        setSelectedUserIndex(index);
        setDropdownOpen(false);
    };

    const copyToClipboard = () => {
        console.log(`📝 Wallet: ${user.wallet}`);
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
                                <h1>{user.name}</h1>
                                <p>{user.bio}</p>
                                <div className="profile-page-wallet" onClick={copyToClipboard}>
                                    <span>{user.wallet}</span>
                                    <FaRegCopy />
                                </div>
                            </div>

                            <div className="profile-page-dropdown">
                                <button className="profile-page-dropdown-toggle" onClick={toggleDropdown}>
                                    {user.name}
                                </button>
                                {dropdownOpen && (
                                    <div className="profile-page-dropdown-menu">
                                        {users.map((u, idx) => (
                                            <div
                                                key={idx}
                                                className={`profile-page-dropdown-item ${selectedUserIndex === idx ? 'active' : ''}`}
                                                onClick={() => selectUser(idx)}
                                            >
                                                {u.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
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

                        <h2 className="profile-page-section-title">Active Listings</h2>
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
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;