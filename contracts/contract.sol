// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// ERC-721
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC721/ERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ERC-2981 royalties
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/common/ERC2981.sol";

// AccessControlEnumerable
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/access/AccessControlEnumerable.sol";

// Безпека
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/security/ReentrancyGuard.sol";

// ERC-20 інтерфейс
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/token/ERC20/IERC20.sol";

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.0/contracts/access/AccessControlEnumerable.sol";


/**
 * @title PropertyNFT
 * @dev ERC721 token representing real estate properties, with metadata URI and ERC-2981 royalties.
 */
contract PropertyNFT is ERC721URIStorage, ERC2981, AccessControlEnumerable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 private _nextTokenId;
    address public admin;

    constructor(address _royaltyReceiver, uint96 _royaltyFeeBasisPoints) ERC721("PropertyNFT", "PROP") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setDefaultRoyalty(_royaltyReceiver, _royaltyFeeBasisPoints);
        admin = msg.sender;
    }

    /**
     * @dev Mint a new Property NFT to `to` with metadata URI.
     * Only accounts with MINTER_ROLE can mint.
     */
    function mintProperty(
        address to,
        string memory tokenURI_,
        address royaltyReceiver,
        uint96 royaltyFeeBasisPoints
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        _setTokenRoyalty(tokenId, royaltyReceiver, royaltyFeeBasisPoints);
        return tokenId;
    }

    /**
     * @dev Override supportsInterface to include ERC2981 and AccessControl
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage, ERC2981, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

/**
 * @title Marketplace
 * @dev Handles listings, escrows, direct sales, and auctions for PropertyNFTs. Uses ERC20 stablecoins or ETH.
 */
contract Marketplace is ReentrancyGuard, AccessControlEnumerable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IERC20 public stableCoin;          // e.g., USDC
    uint256 public constant FEE_BASIS = 10000;
    uint96 public marketplaceFeeBP;    // fee in basis points
    uint48 public antiSnipingTime;     // seconds to extend if bid placed near end

    mapping(address => bool) public isKYCed; // KYC whitelist

    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    struct Auction {
        address seller;
        uint256 reservePrice;
        uint256 highestBid;
        address highestBidder;
        uint48 startTime;
        uint48 endTime;
        bool settled;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => mapping(uint256 => Auction)) public auctions;

    event Listed(address indexed tokenContract, uint256 indexed tokenId, address seller, uint256 price);
    event Sale(address indexed tokenContract, uint256 indexed tokenId, address buyer, uint256 price);
    event AuctionCreated(address indexed tokenContract, uint256 indexed tokenId, uint256 reservePrice, uint48 startTime, uint48 endTime);
    event BidPlaced(address indexed tokenContract, uint256 indexed tokenId, address bidder, uint256 amount);
    event AuctionExtended(address indexed tokenContract, uint256 indexed tokenId, uint48 newEndTime);
    event AuctionSettled(address indexed tokenContract, uint256 indexed tokenId, address winner, uint256 amount);
    event KYCUpdated(address user, bool approved);

    constructor(IERC20 _stableCoin, uint96 _marketplaceFeeBP, uint48 _antiSnipingTime) {
        stableCoin = _stableCoin;
        marketplaceFeeBP = _marketplaceFeeBP;
        antiSnipingTime = _antiSnipingTime;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Admin can update KYC status of users
     */
    function setKYC(address user, bool approved) external onlyRole(ADMIN_ROLE) {
        isKYCed[user] = approved;
        emit KYCUpdated(user, approved);
    }

    /**
     * @dev Admin can adjust anti-sniping window
     */
    function setAntiSnipingTime(uint48 _seconds) external onlyRole(ADMIN_ROLE) {
        antiSnipingTime = _seconds;
    }

    /**
     * @dev List a token for direct sale. Transfers NFT to escrow.
     */
    function listItem(address tokenContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(isKYCed[msg.sender], "Seller not KYC approved");
        require(price > 0, "Price must be > 0");
        PropertyNFT(tokenContract).transferFrom(msg.sender, address(this), tokenId);
        listings[tokenContract][tokenId] = Listing(msg.sender, price, true);
        emit Listed(tokenContract, tokenId, msg.sender, price);
    }

    /**
     * @dev Buy a listed token with stablecoin.
     */
    function buyItem(address tokenContract, uint256 tokenId) external nonReentrant {
        require(isKYCed[msg.sender], "Buyer not KYC approved");
        Listing memory lst = listings[tokenContract][tokenId];
        require(lst.active, "Not listed");
        uint256 fee = (lst.price * marketplaceFeeBP) / FEE_BASIS;
        uint256 sellerProceeds = lst.price - fee;

        stableCoin.transferFrom(msg.sender, address(this), lst.price);
        stableCoin.transfer(getRoleMember(DEFAULT_ADMIN_ROLE, 0), fee);
        stableCoin.transfer(lst.seller, sellerProceeds);

        PropertyNFT(tokenContract).transferFrom(address(this), msg.sender, tokenId);
        listings[tokenContract][tokenId].active = false;
        emit Sale(tokenContract, tokenId, msg.sender, lst.price);
    }

    /**
     * @dev Create a timed auction for a token. Transfers to escrow.
     */
    function createTimedAuction(
        address tokenContract,
        uint256 tokenId,
        uint256 reservePrice,
        uint48 startTime,
        uint48 endTime
    ) external nonReentrant {
        require(isKYCed[msg.sender], "Seller not KYC approved");
        require(endTime > startTime, "Invalid times");
        PropertyNFT(tokenContract).transferFrom(msg.sender, address(this), tokenId);
        auctions[tokenContract][tokenId] = Auction(msg.sender, reservePrice, 0, address(0), startTime, endTime, false);
        emit AuctionCreated(tokenContract, tokenId, reservePrice, startTime, endTime);
    }

    /**
     * @dev Place a bid in an auction with anti-sniping extension.
     */
    function placeBid(address tokenContract, uint256 tokenId, uint256 amount) external nonReentrant {
        require(isKYCed[msg.sender], "Bidder not KYC approved");
        Auction storage auc = auctions[tokenContract][tokenId];
        require(block.timestamp >= auc.startTime && block.timestamp <= auc.endTime, "Not active");
        require(amount > auc.highestBid && amount >= auc.reservePrice, "Bid too low");

        if (auc.highestBidder != address(0)) {
            stableCoin.transfer(auc.highestBidder, auc.highestBid);
        }
        stableCoin.transferFrom(msg.sender, address(this), amount);

        auc.highestBid = amount;
        auc.highestBidder = msg.sender;
        emit BidPlaced(tokenContract, tokenId, msg.sender, amount);

        // Anti-sniping: extend if within threshold
        if (auc.endTime - block.timestamp < antiSnipingTime) {
            auc.endTime = uint48(block.timestamp + antiSnipingTime);
            emit AuctionExtended(tokenContract, tokenId, auc.endTime);
        }
    }

    /**
     * @dev Settle an auction after endTime: transfers NFT and funds.
     */
    function settleAuction(address tokenContract, uint256 tokenId) external nonReentrant {
        Auction storage auc = auctions[tokenContract][tokenId];
        require(block.timestamp > auc.endTime, "Auction not ended");
        require(!auc.settled, "Already settled");

        if (auc.highestBidder != address(0)) {
            uint256 fee = (auc.highestBid * marketplaceFeeBP) / FEE_BASIS;
            uint256 sellerProceeds = auc.highestBid - fee;
            stableCoin.transfer(getRoleMember(DEFAULT_ADMIN_ROLE, 0), fee);
            stableCoin.transfer(auc.seller, sellerProceeds);
            PropertyNFT(tokenContract).transferFrom(address(this), auc.highestBidder, tokenId);
            emit AuctionSettled(tokenContract, tokenId, auc.highestBidder, auc.highestBid);
        } else {
            PropertyNFT(tokenContract).transferFrom(address(this), auc.seller, tokenId);
        }
        auc.settled = true;
    }

    /**
     * @dev Admin can adjust marketplace fee.
     */
    function setMarketplaceFee(uint96 newFeeBP) external onlyRole(ADMIN_ROLE) {
        require(newFeeBP < FEE_BASIS, "Fee too high");
        marketplaceFeeBP = newFeeBP;
    }
}
