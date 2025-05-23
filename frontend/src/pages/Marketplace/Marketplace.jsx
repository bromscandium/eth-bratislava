// src/pages/Marketplace/Marketplace.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Marketplace.scss';
import PropertyList from '../../components/PropertyList/PropertyList';
import properties from '../../data/data.js';

const countries = [
    { key: 'all', label: 'All Countries' },
    { key: 'Estonia', label: 'Estonia' },
    { key: 'UAE', label: 'UAE' }
];

const tagOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'trade', label: 'Trades' },
    { value: 'auction', label: 'Auctions' }
];

const sortOptions = [
    { value: 'az', label: 'Name A-Z' },
    { value: 'za', label: 'Name Z-A' },
    { value: 'price_asc', label: 'Price ↑' },
    { value: 'price_desc', label: 'Price ↓' },
    { value: 'date_desc', label: 'Newest' },
    { value: 'date_asc', label: 'Oldest' }
];

const minAllowed = Math.min(...properties.map(p => p.priceUsdC));
const maxAllowed = Math.max(...properties.map(p => p.priceUsdC));

export default function Marketplace() {
    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const [searchQuery, setSearchQuery] = useState(query.get('q') || '');
    const [selectedCountry, setSelectedCountry] = useState(query.get('country') || 'all');
    const [selectedTag, setSelectedTag] = useState(query.get('tag') || 'all');
    const [sortFilter, setSortFilter] = useState('az');
    const [priceRange, setPriceRange] = useState([minAllowed, maxAllowed]);

    return (
        <div className="marketplace-outer">
            <div className="marketplace-info">
                <h2>Property Marketplace</h2>
                <p className="marketplace-description">
                    Buy, sell, and auction properties directly using NFT technology. All
                    transactions are powered by Ethereum blockchain.
                </p>
            </div>

            <div className="marketplace-layout container">
                <aside className="marketplace-filters">
                    {/* optional sidebar */}
                </aside>

                <main className="marketplace-main">
                    <div className="filters">
                        {/* search */}
                        <div className="search-filter">
                            <svg viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* price slider */}
                        <div className="price-slider">
                            <label>Price range</label>
                            <Slider
                                range
                                min={minAllowed}
                                max={maxAllowed}
                                value={priceRange}
                                onChange={setPriceRange}
                                allowCross={false}
                            />
                            <div className="slider-values">
                                <span>${priceRange[0].toLocaleString()}</span>
                                <span>${priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>

                        {/* country */}
                        <select
                            className="dropdown-select"
                            value={selectedCountry}
                            onChange={e => setSelectedCountry(e.target.value)}
                        >
                            {countries.map(c => (
                                <option key={c.key} value={c.key}>{c.label}</option>
                            ))}
                        </select>

                        {/* type */}
                        <select
                            className="dropdown-select"
                            value={selectedTag}
                            onChange={e => setSelectedTag(e.target.value)}
                        >
                            {tagOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>

                        {/* sort */}
                        <select
                            className="dropdown-select"
                            value={sortFilter}
                            onChange={e => setSortFilter(e.target.value)}
                        >
                            {sortOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>

                    <PropertyList
                        selectedTag={selectedTag}
                        selectedCountry={selectedCountry}
                        filter={sortFilter}
                        minPrice={priceRange[0]}
                        maxPrice={priceRange[1]}
                        searchQuery={searchQuery}
                    />
                </main>
            </div>
        </div>
    );
}
