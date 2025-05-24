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

    const [dropdownCountryOpen, setDropdownCountryOpen] = useState(false);
    const [dropdownTypeOpen, setDropdownTypeOpen] = useState(false);
    const [dropdownSortOpen, setDropdownSortOpen] = useState(false);

    const toggleDropdownCountry = () => setDropdownCountryOpen(o => !o);
    const toggleDropdownType = () => setDropdownTypeOpen(o => !o);
    const toggleDropdownSort = () => setDropdownSortOpen(o => !o);

    const getArrowClass = (open) => open ? 'arrow up' : 'arrow down';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown')) {
                setDropdownCountryOpen(false);
                setDropdownTypeOpen(false);
                setDropdownSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <aside className="marketplace-filters" />

                <main className="marketplace-main">
                    <div className="filters">
                        {/* Search */}
                        <div className="search-filter">
                            <svg viewBox="0 0 24 24" fill="none" >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Price Slider */}
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

                        {/* Country Dropdown */}
                        <div className="dropdown dropdown-country">
                            <button
                                type="button"
                                className="dropdown-toggle"
                                onClick={toggleDropdownCountry}
                            >
                                {countries.find(c => c.key === selectedCountry)?.label || 'Select Country'}
                                <span className={getArrowClass(dropdownCountryOpen)} />
                            </button>
                            {dropdownCountryOpen && (
                                <div className="dropdown-menu">
                                    {countries.map(c => (
                                        <div
                                            key={c.key}
                                            className={`dropdown-item ${selectedCountry === c.key ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedCountry(c.key);
                                                setDropdownCountryOpen(false);
                                            }}
                                        >
                                            {c.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Type Dropdown */}
                        <div className="dropdown dropdown-type">
                            <button
                                type="button"
                                className="dropdown-toggle"
                                onClick={toggleDropdownType}
                            >
                                {tagOptions.find(o => o.value === selectedTag)?.label || 'Select Type'}
                                <span className={getArrowClass(dropdownTypeOpen)} />
                            </button>
                            {dropdownTypeOpen && (
                                <div className="dropdown-menu">
                                    {tagOptions.map(o => (
                                        <div
                                            key={o.value}
                                            className={`dropdown-item ${selectedTag === o.value ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedTag(o.value);
                                                setDropdownTypeOpen(false);
                                            }}
                                        >
                                            {o.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="dropdown dropdown-sort">
                            <button
                                type="button"
                                className="dropdown-toggle"
                                onClick={toggleDropdownSort}
                            >
                                {sortOptions.find(o => o.value === sortFilter)?.label || 'Sort By'}
                                <span className={getArrowClass(dropdownSortOpen)} />
                            </button>
                            {dropdownSortOpen && (
                                <div className="dropdown-menu">
                                    {sortOptions.map(o => (
                                        <div
                                            key={o.value}
                                            className={`dropdown-item ${sortFilter === o.value ? 'active' : ''}`}
                                            onClick={() => {
                                                setSortFilter(o.value);
                                                setDropdownSortOpen(false);
                                            }}
                                        >
                                            {o.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
