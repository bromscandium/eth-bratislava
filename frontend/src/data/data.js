const properties = [
    {
        id: 'prop001',
        name: 'Skyline Penthouse',
        description: 'Luxury penthouse with panoramic views of the city skyline.',
        hashtag: 'auction',
        image: 'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        priceUsdC: 57000,    // 28.5 ETH × 2000 USDC
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-04-12'
    },
    {
        id: 'prop002',
        name: 'Ether Cabin',
        description: 'A quiet, modern cabin in the mountains — 100% off-grid.',
        hashtag: 'trade',
        image: 'https://www.mera-project.ru/upload/iblock/879/go4j68y9xdwjwja4nb05bhkm1pj8got4.jpg',
        priceUsdC: 15800,    // 7.9 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-02-20'
    },
    {
        id: 'prop003',
        name: 'Desert Dome',
        description: 'Futuristic dome home located in a private desert reserve.',
        hashtag: 'auction',
        image: 'https://fin.house/wp-content/uploads/2023/06/alta-116-2.png',
        priceUsdC: 24600,    // 12.3 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-03-05'
    },
    {
        id: 'prop004',
        name: 'Oceanfront Villa',
        description: 'A sleek, glass-walled villa with direct ocean access.',
        hashtag: 'trade',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDr0W1rXBQDW5aw_5KMQMBx6SnYqm58JS-w&s',
        priceUsdC: 70000,    // 35.0 ETH × 2000 USDC
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-05-01'
    },
    {
        id: 'prop005',
        name: 'Urban Treehouse',
        description: 'Eco-loft nestled among the trees in a smart urban forest.',
        hashtag: 'trade',
        image: 'https://domsbobrom.com/uploads/images/stati/Koda/ommech.jpg',
        priceUsdC: 19000,    // 9.5 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-01-15'
    },
    {
        id: 'prop006',
        name: 'Cyber Ranch',
        description: 'A high-tech ranch in the digital frontier.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnY738mYgo0a82qfpsiA4oThiICowcVlmBg&s',
        priceUsdC: 32000,    // 16.0 ETH × 2000 USDC
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-02-28'
    },
    {
        id: 'prop007',
        name: 'Floating ETHouse',
        description: 'A floating smart home powered by solar and Ethereum.',
        hashtag: 'trade',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGVikGPlOmiP6vo5FgDHRIPzRTfR609PbqA&s',
        priceUsdC: 39600,    // 19.8 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Haapsalu',
        postDate: '2025-03-18'
    },
    {
        id: 'prop008',
        name: 'NFT Loft',
        description: 'Industrial-style loft fully decorated with NFT art.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMMaDwrZXUsgFkBOYlZa1hSTcFHuW4yFU2g&s',
        priceUsdC: 26600,    // 13.3 ETH × 2000 USDC
        country: 'UAE',
        city: 'Sharjah',
        postDate: '2025-04-01'
    },
    {
        id: 'prop009',
        name: 'Crystal Chalet',
        description: 'Glass & wood chalet located in a private ski valley.',
        hashtag: 'trade',
        image: 'https://brisbanedevelopment.com.au/wp-content/uploads/2024/02/Burly-Residences-penthouse-balcony-artist-impression-lr-860x473.jpg',
        priceUsdC: 42200,    // 21.1 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Otepää',
        postDate: '2025-02-09'
    },
    {
        id: 'prop010',
        name: 'Meta Mansion',
        description: 'Lavish estate with token-gated access and metaverse extensions.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1oAIL9fvFbECoD02UHH4sjAcOfD6KgKT2g&s',
        priceUsdC: 85400,    // 42.7 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-04-20'
    },
    {
        id: 'prop011',
        name: 'Token Tower',
        description: 'A modern high-rise with tokenized access and cityscape views.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        priceUsdC: 48800,    // 24.4 ETH × 2000 USDC
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-01-25'
    },
    {
        id: 'prop012',
        name: 'Smart Studio',
        description: 'Automated city studio apartment for digital nomads.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
        priceUsdC: 10600,    // 5.3 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Pärnu',
        postDate: '2025-03-28'
    },
    {
        id: 'prop013',
        name: 'Blockchain Barn',
        description: 'Minimalist barn conversion with full blockchain amenities.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae',
        priceUsdC: 17400,    // 8.7 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Viljandi',
        postDate: '2025-02-15'
    },
    {
        id: 'prop014',
        name: 'Sky Yacht',
        description: 'Luxury sky-floating residence with panoramic crypto dashboard.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        priceUsdC: 110400,   // 55.2 ETH × 2000 USDC
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-10'
    },
    {
        id: 'prop015',
        name: 'Pixel Palace',
        description: 'Art deco palace redesigned for NFT exhibitions.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
        priceUsdC: 77600,    // 38.8 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-04-05'
    },
    {
        id: 'prop016',
        name: 'Fjord Retreat',
        description: 'Waterfront retreat built for privacy and blockchain mining.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3',
        priceUsdC: 35200,    // 17.6 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-03-06'
    },
    {
        id: 'prop017',
        name: 'Oasis Cube',
        description: 'Desert cube house with integrated NFT gallery.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
        priceUsdC: 40400,    // 20.2 ETH × 2000 USDC
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-24'
    },
    {
        id: 'prop018',
        name: 'Retro Villa',
        description: 'Retro-futuristic villa with Ethereum payment integration.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1',
        priceUsdC: 59800,    // 29.9 ETH × 2000 USDC
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-15'
    },
    {
        id: 'prop019',
        name: 'Arctic Base',
        description: 'Smart home in the arctic, fully autonomous and green.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        priceUsdC: 53400,    // 26.7 ETH × 2000 USDC
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-02-23'
    },
    {
        id: 'prop020',
        name: 'Lava Loft',
        description: 'Loft built atop cooled lava, with VR interfaces and heated floors.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
        priceUsdC: 30200,    // 15.1 ETH × 2000 USDC
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-04-30'
    }
];

export default properties;
