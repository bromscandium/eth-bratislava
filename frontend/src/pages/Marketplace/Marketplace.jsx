import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Marketplace.scss';
import PropertyList from '../../components/PropertyList/PropertyList';
import properties from '../../data/data.js';

const countries = [
    { key: null, label: 'All' },
    { key: 'Estonia', label: 'Estonia' },
    { key: 'UAE', label: 'UAE' }
];

const tagOptions = [
    { label: 'All', value: null },
    { label: 'Trades', value: 'trade' },
    { label: 'Auctions', value: 'auction' }
];

const sortOptions = [
    { label: 'Name A-Z', value: 'az' },
    { label: 'Name Z-A', value: 'za' },
    { label: 'Price ↑', value: 'price_asc' },
    { label: 'Price ↓', value: 'price_desc' },
    { label: 'Newest First', value: 'date_desc' },
    { label: 'Oldest First', value: 'date_asc' }
];

// визначаємо мінімальну та максимальну ціну
const minAllowed = Math.min(...properties.map(p => p.priceUsdC));
const maxAllowed = Math.max(...properties.map(p => p.priceUsdC));

function renderRadios(options, value, setValue, group, keyProp = 'value', labelProp = 'label') {
    return options.map(opt => (
        <label className="custom-radio" key={opt[keyProp] ?? opt[labelProp]}>
            <input
                type="radio"
                name={group}
                checked={value === opt[keyProp]}
                onChange={() => setValue(opt[keyProp])}
            />
            <span className="checkmark" />
            {opt[labelProp]}
        </label>
    ));
}

export default function Marketplace() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const defaultCountry = query.get('country') || null;

    const [priceRange, setPriceRange] = useState([minAllowed, maxAllowed]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
    const [sortFilter, setSortFilter] = useState('az');

    return (
        <div className="marketplace-outer">
            <div className="marketplace-info">
                <h2>Available Properties</h2>
                <p className="marketplace-description">
                    Buy, sell, and join property auctions secured on USDC.
                    Easily filter and sort real, tokenized assets by category, country, or price.
                    Invest in real estate with transparency, speed, and global reach!
                </p>
            </div>

            <div className="marketplace-layout container">
                <aside className="marketplace-filters">
                    <div className="filters-inner">
                        <div className="filters-title filters-title-lg">Filters</div>

                        <div className="filter-block">
                            <div className="filter-label filter-label-lg">Price range (USDC)</div>
                            <div className="filter-row" style={{ width: 200, padding: '0 8px' }}>
                                <Slider
                                    range
                                    min={minAllowed}
                                    max={maxAllowed}
                                    value={priceRange}
                                    step={0.01}
                                    onChange={setPriceRange}
                                    allowCross={false}
                                    trackStyle={[{ backgroundColor: '#a259ff' }]}
                                    handleStyle={[
                                        { borderColor: '#a259ff', background: '#fff' },
                                        { borderColor: '#a259ff', background: '#fff' }
                                    ]}
                                    railStyle={{ backgroundColor: '#41376b' }}
                                />
                                <div className="price-range-values">
                                    <span>{priceRange[0]} USDC</span>
                                    <span style={{ margin: '0 4px' }}>–</span>
                                    <span>{priceRange[1]} USDC</span>
                                </div>
                            </div>
                        </div>

                        <div className="filter-block">
                            <div className="filter-label filter-label-lg">By category</div>
                            <div className="filter-row">
                                {renderRadios(tagOptions, selectedTag, setSelectedTag, 'category')}
                            </div>
                        </div>

                        <div className="filter-block">
                            <div className="filter-label filter-label-lg">By country</div>
                            <div className="filter-row">
                                {renderRadios(countries, selectedCountry, setSelectedCountry, 'country', 'key', 'label')}
                            </div>
                        </div>

                        <div className="filter-block">
                            <div className="filter-label filter-label-lg">Sort by</div>
                            <div className="filter-row">
                                {renderRadios(sortOptions, sortFilter, setSortFilter, 'sort')}
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="marketplace-main">
                    <PropertyList
                        selectedTag={selectedTag}
                        selectedCountry={selectedCountry}
                        filter={sortFilter}
                        minPrice={priceRange[0]}
                        maxPrice={priceRange[1]}
                    />
                </main>
            </div>
        </div>
    );
}
