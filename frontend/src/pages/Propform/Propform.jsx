import React, { useEffect } from 'react';
import './Propform.scss';

const Propform = () => {
    useEffect(() => {
        const form = document.getElementById('propertyForm');
        if (!form) return;

        const listingTypeRadios = document.querySelectorAll('input[name="listingType"]');
        const fixedPriceFields = document.getElementById('fixedPriceFields');
        const auctionFields = document.getElementById('auctionFields');

        if (!fixedPriceFields || !auctionFields) return;

        listingTypeRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'fixed') {
                    fixedPriceFields.style.display = 'block';
                    auctionFields.style.display = 'none';
                } else {
                    fixedPriceFields.style.display = 'none';
                    auctionFields.style.display = 'block';
                }
                updatePreview();
            });
        });

        const imageUpload = document.getElementById('imageUpload');
        const propertyImage = document.getElementById('propertyImage');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');

        if (imageUpload && propertyImage) {
            imageUpload.addEventListener('click', () => propertyImage.click());

            propertyImage.addEventListener('change', function (e) {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        if (imagePreview && previewImage) {
                            imagePreview.src = event.target.result;
                            imagePreview.style.display = 'block';
                            previewImage.style.backgroundImage = `url(${event.target.result})`;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const formInputs = document.querySelectorAll('#propertyForm input, #propertyForm select, #propertyForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
        });

        document.getElementById('propertyForm')?.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Listing created successfully! (Check console)');
        });

        function updatePreview() {
            const title = document.getElementById('title').value;
            const location = document.getElementById('location').value;
            const area = document.getElementById('area').value;
            const bedrooms = document.getElementById('bedrooms').value;
            const bathrooms = document.getElementById('bathrooms').value;
            const price = document.getElementById('price')?.value || '0.0';
            const currency = document.getElementById('currency')?.value || 'USDC';

            document.getElementById('previewTitle').textContent = title || 'Property Title';
            document.getElementById('previewLocationText').textContent = location || 'Location';
            document.getElementById('previewArea').textContent = area || '-';
            document.getElementById('previewBeds').textContent = bedrooms || '-';
            document.getElementById('previewBaths').textContent = bathrooms || '-';
            document.getElementById('previewAmount').textContent = price;
            document.getElementById('previewCurrency').textContent = currency;
        }

        updatePreview();
    }, []);

    return (
        <div className="propform-container">
            <h1 className="propform-title">Create Property Listing</h1>
            <form id="propertyForm">
                <h2 className="propform-subtitle">Property Details</h2>
                <div className="propform-group">
                    <label htmlFor="title" className="propform-label">Property Title</label>
                    <input type="text" id="title" name="title" placeholder="Modern Apartment in Tallinn" className="propform-input" required />
                </div>
                <div className="propform-group">
                    <label htmlFor="description" className="propform-label">Description</label>
                    <textarea id="description" name="description" rows="4" placeholder="Describe the property in detail..." className="propform-textarea" required></textarea>
                </div>
                <div className="propform-row">
                    <div className="propform-group">
                        <label htmlFor="location" className="propform-label">Location</label>
                        <input type="text" id="location" name="location" placeholder="Tallinn, Estonia" className="propform-input" required />
                    </div>
                    <div className="propform-group">
                        <label htmlFor="country" className="propform-label">Country</label>
                        <select id="country" name="country" className="propform-select" required>
                            <option value="">Select Country</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Dubai, UAE">Dubai, UAE</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="propform-row">
                    <div className="propform-group">
                        <label htmlFor="area" className="propform-label">Area (m²)</label>
                        <input type="number" id="area" name="area" min="1" placeholder="85" className="propform-input" required />
                    </div>
                    <div className="propform-group">
                        <label htmlFor="bedrooms" className="propform-label">Bedrooms</label>
                        <input type="number" id="bedrooms" name="bedrooms" min="0" placeholder="2" className="propform-input" required />
                    </div>
                    <div className="propform-group">
                        <label htmlFor="bathrooms" className="propform-label">Bathrooms</label>
                        <input type="number" id="bathrooms" name="bathrooms" min="0" placeholder="1" className="propform-input" required />
                    </div>
                </div>
                <div className="propform-group">
                    <label htmlFor="propertyType" className="propform-label">Property Type</label>
                    <select id="propertyType" name="propertyType" className="propform-select" required>
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Commercial">Commercial Space</option>
                        <option value="Land">Land</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <h2 className="propform-subtitle">Listing Type</h2>
                <div className="propform-radio-group">
                    <div className="propform-radio-option">
                        <input type="radio" id="fixedPrice" name="listingType" value="fixed" defaultChecked />
                        <label htmlFor="fixedPrice">Fixed Price</label>
                    </div>
                    <div className="propform-radio-option">
                        <input type="radio" id="auction" name="listingType" value="auction" />
                        <label htmlFor="auction">Auction</label>
                    </div>
                </div>

                <div id="fixedPriceFields">
                    <div className="propform-row">
                        <div className="propform-group">
                            <label htmlFor="price" className="propform-label">Price</label>
                            <input type="number" id="price" name="price" min="0" step="0.01" placeholder="2.5" className="propform-input" />
                        </div>
                        <div className="propform-group">
                            <label htmlFor="currency" className="propform-label">Currency</label>
                            <select id="currency" name="currency" className="propform-select">
                                <option value="USDC">USDC</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="auctionFields" className="propform-auction-fields">
                    <div className="propform-row">
                        <div className="propform-group">
                            <label htmlFor="startingBid" className="propform-label">Starting Bid</label>
                            <input type="number" id="startingBid" name="startingBid" min="0" step="0.01" placeholder="1.0" className="propform-input" />
                        </div>
                        <div className="propform-group">
                            <label htmlFor="auctionCurrency" className="propform-label">Currency</label>
                            <select id="auctionCurrency" name="auctionCurrency" className="propform-select">
                                <option value="ETH">ETH</option>
                                <option value="USDC">USDC</option>
                                <option value="USDT">USDT</option>
                                <option value="BTC">BTC</option>
                            </select>
                        </div>
                    </div>
                    <div className="propform-row">
                        <div className="propform-group">
                            <label htmlFor="auctionStart" className="propform-label">Start Date</label>
                            <input type="datetime-local" id="auctionStart" name="auctionStart" className="propform-input" />
                        </div>
                        <div className="propform-group">
                            <label htmlFor="auctionEnd" className="propform-label">End Date</label>
                            <input type="datetime-local" id="auctionEnd" name="auctionEnd" className="propform-input" />
                        </div>
                    </div>
                    <div className="propform-group">
                        <label htmlFor="reservePrice" className="propform-label">Reserve Price (optional)</label>
                        <input type="number" id="reservePrice" name="reservePrice" min="0" step="0.01" placeholder="Minimum price you'll accept" className="propform-input" />
                    </div>
                </div>

                <h2 className="propform-subtitle">Property Image</h2>
                <div className="propform-image-upload" id="imageUpload">
                    <input type="file" id="propertyImage" name="propertyImage" accept="image/*" required />
                    <div className="propform-image-icon">📁</div>
                    <div className="propform-image-text">Click to upload property image</div>
                </div>
                <img id="imagePreview" className="propform-image-preview" alt="Property preview" />

                <h2 className="propform-subtitle">NFT Minting Details</h2>
                <div className="propform-group">
                    <label htmlFor="toAddress" className="propform-label">To Address (Owner Wallet)</label>
                    <input type="text" id="toAddress" name="toAddress" placeholder="0x..." className="propform-input" required />
                </div>
                <div className="propform-group">
                    <label htmlFor="tokenURI" className="propform-label">Token URI (Metadata)</label>
                    <input type="url" id="tokenURI" name="tokenURI" placeholder="https://..." className="propform-input" required />
                </div>
                <div className="propform-row">
                    <div className="propform-group">
                        <label htmlFor="royaltyReceiver" className="propform-label">Royalty Receiver</label>
                        <input type="text" id="royaltyReceiver" name="royaltyReceiver" placeholder="0x..." className="propform-input" required />
                    </div>
                    <div className="propform-group">
                        <label htmlFor="royaltyFee" className="propform-label">Royalty Fee (BP)</label>
                        <input type="number" id="royaltyFee" name="royaltyFee" min="0" max="10000" placeholder="500 (5%)" className="propform-input" required />
                    </div>
                </div>

                <button type="submit" className="propform-submit">Create Listing & Mint NFT</button>
            </form>

            <div className="propform-preview-section">
                <h2 className="propform-subtitle">Listing Preview</h2>
                <div className="propform-preview-card">
                    <div className="propform-preview-image" id="previewImage"></div>
                    <div className="propform-preview-details">
                        <div className="propform-preview-price">
                            <span id="previewCurrency"></span>
                            <span id="previewAmount"></span>
                        </div>
                        <h3 className="propform-preview-title" id="previewTitle">Property Title</h3>
                        <div className="propform-preview-location">
                            <span id="previewLocationText">Location</span>
                        </div>
                        <div className="propform-preview-features">
                            <div className="propform-preview-feature">
                                <span className="propform-preview-value" id="previewArea">-</span>
                                <span className="propform-preview-label">Area</span>
                            </div>
                            <div className="propform-preview-feature">
                                <span className="propform-preview-value" id="previewBeds">-</span>
                                <span className="propform-preview-label">Beds</span>
                            </div>
                            <div className="propform-preview-feature">
                                <span className="propform-preview-value" id="previewBaths">-</span>
                                <span className="propform-preview-label">Bath</span>
                            </div>
                        </div>
                        <div id="previewAuctionInfo"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Propform;
