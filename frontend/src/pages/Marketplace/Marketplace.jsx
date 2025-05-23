import React, { useState } from 'react';
import './Marketplace.scss';
import PropertyList from "../../components/PropertyList/PropertyList";
import { useParams } from "react-router-dom";

export default function Marketplace() {
    const { filter: filterFromURL } = useParams();
    const [sortBy, setSortBy] = useState('default');

    const handleChange = (e) => {
        setSortBy(e.target.value);
    };

    console.log("🔍 filterFromURL:", filterFromURL);

    return (
        <div className="home-page">
            <div className="filter-bar">
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" onChange={handleChange} value={sortBy}>
                    <option value="default">Default</option>
                    <option value="az">Name A-Z</option>
                    <option value="za">Name Z-A</option>
                    <option value="price">Price</option>
                    <option value="country">Country</option>
                </select>
            </div>
            <PropertyList selectedTag={filterFromURL || null} sortBy={sortBy} />
        </div>
    );
}
