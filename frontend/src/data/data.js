const coordsMap = {
    prop001: [55.2708, 25.2048],    // Dubai
    prop002: [26.7227, 58.3776],    // Tartu
    prop003: [26.7227, 58.3776],    // Tartu
    prop004: [54.3667, 24.4667],    // Abu Dhabi
    prop005: [24.7536, 59.43696],   // Tallinn
    prop006: [55.2708, 25.2048],    // Dubai
    prop007: [23.5403, 58.7461],    // Haapsalu
    prop008: [55.3890, 25.3573],    // Sharjah
    prop009: [26.4844, 57.8442],    // Otepää
    prop010: [26.7227, 58.3776],    // Tartu
    prop011: [55.2708, 25.2048],    // Dubai
    prop012: [24.5036, 58.3859],    // Pärnu
    prop013: [25.5833, 58.3639],    // Viljandi
    prop014: [54.3667, 24.4667],    // Abu Dhabi
    prop015: [24.7536, 59.43696],   // Tallinn
    prop016: [26.7227, 58.3776],    // Tartu
    prop017: [54.3667, 24.4667],    // Abu Dhabi
    prop018: [54.3667, 24.4667],    // Abu Dhabi
    prop019: [24.7536, 59.43696],   // Tallinn
    prop020: [55.2708, 25.2048]     // Dubai
};

const properties = [
    {
        id: 'prop001',
        name: 'Skyline Penthouse',
        description: 'A 180 m² luxury penthouse with floor-to-ceiling windows offering panoramic Dubai skyline views. It features an open-plan living and dining area, a fully equipped designer kitchen, private terrace with BBQ hookup, and 24/7 concierge service.',
        hashtag: 'auction',
        image: 'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        priceUsdC: 57000,
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-04-12',
        coords: coordsMap.prop001,
        area: 180,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop002',
        name: 'Ether Cabin',
        description: 'An 80 m² off-grid mountain cabin fully powered by solar panels and rainwater harvesting. It offers two cozy bedrooms, a wood-burning stove, panoramic forest-framing windows, and Scandinavian-inspired minimalist interiors.',
        hashtag: 'trade',
        image: 'https://www.mera-project.ru/upload/iblock/879/go4j68y9xdwjwja4nb05bhkm1pj8got4.jpg',
        priceUsdC: 15800,
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-02-20',
        coords: coordsMap.prop002,
        area: 80,
        beds: 2,
        bath: 1
    },
    {
        id: 'prop003',
        name: 'Desert Dome',
        description: 'A futuristic 120 m² dome home set in a private desert reserve, blending eco-materials with modern design. Includes two bedrooms, two en-suite bathrooms, a central skylight over the living area, and climate-controlled interiors.',
        hashtag: 'auction',
        image: 'https://fin.house/wp-content/uploads/2023/06/alta-116-2.png',
        priceUsdC: 24600,
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-03-05',
        coords: coordsMap.prop003,
        area: 120,
        beds: 2,
        bath: 2
    },
    {
        id: 'prop004',
        name: 'Oceanfront Villa',
        description: 'A sleek 250 m² glass-walled villa with private ocean access and an infinity pool. Boasts four ensuite bedrooms, a smart-home automation system, and an expansive outdoor lounge deck for breathtaking sunset views.',
        hashtag: 'trade',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDr0W1rXBQDW5aw_5KMQMBx6SnYqm58JS-w&s',
        priceUsdC: 70000,
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-05-01',
        coords: coordsMap.prop004,
        area: 250,
        beds: 4,
        bath: 4
    },
    {
        id: 'prop005',
        name: 'Urban Treehouse',
        description: 'A 70 m² eco-loft perched among urban trees in a city park, combining nature with modern comforts. Includes one bedroom, one bathroom, a green roof, rainwater collection, and integrated IoT climate control.',
        hashtag: 'trade',
        image: 'https://domsbobrom.com/uploads/images/stati/Koda/ommech.jpg',
        priceUsdC: 19000,
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-01-15',
        coords: coordsMap.prop005,
        area: 70,
        beds: 1,
        bath: 1
    },
    {
        id: 'prop006',
        name: 'Cyber Ranch',
        description: 'A 200 m² high-tech ranch featuring rooftop solar panels and automated livestock monitoring. Contains three bedrooms, two bathrooms, NFT-enabled access control, and an industrial-rustic interior that merges frontier living with cutting-edge tech.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnY738mYgo0a82qfpsiA4oThiICowcVlmBg&s',
        priceUsdC: 32000,
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-02-28',
        coords: coordsMap.prop006,
        area: 200,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop007',
        name: 'Floating ETHouse',
        description: 'A 110 m² solar-powered floating home with automated buoyancy controls and sweeping water views. Offers two bedrooms, two bathrooms, minimalist open-plan design, and blockchain-based utility billing.',
        hashtag: 'trade',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGVikGPlOmiP6vo5FgDHRIPzRTfR609PbqA&s',
        priceUsdC: 39600,
        country: 'Estonia',
        city: 'Haapsalu',
        postDate: '2025-03-18',
        coords: coordsMap.prop007,
        area: 110,
        beds: 2,
        bath: 2
    },
    {
        id: 'prop008',
        name: 'NFT Loft',
        description: 'A 95 m² industrial loft gallery adorned with rotating NFT artworks. Features two bedrooms, one bathroom, gallery-style lighting, token-gated security, and an open creative studio space.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMMaDwrZXUsgFkBOYlZa1hSTcFHuW4yFU2g&s',
        priceUsdC: 26600,
        country: 'UAE',
        city: 'Sharjah',
        postDate: '2025-04-01',
        coords: coordsMap.prop008,
        area: 95,
        beds: 2,
        bath: 1
    },
    {
        id: 'prop009',
        name: 'Crystal Chalet',
        description: 'A 140 m² glass-and-wood ski chalet nestled in a private mountain valley. Features three bedrooms, two bathrooms, underfloor heating, stone fireplace, and ski-in/ski-out access.',
        hashtag: 'trade',
        image: 'https://brisbanedevelopment.com.au/wp-content/uploads/2024/02/Burly-Residences-penthouse-balcony-artist-impression-lr-860x473.jpg',
        priceUsdC: 42200,
        country: 'Estonia',
        city: 'Otepää',
        postDate: '2025-02-09',
        coords: coordsMap.prop009,
        area: 140,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop010',
        name: 'Meta Mansion',
        description: 'A 300 m² estate with token-gated entry and metaverse extensions. Includes five bedrooms, four bathrooms, a VR home cinema, digital art gallery, and AI-driven climate and lighting.',
        hashtag: 'auction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1oAIL9fvFbECoD02UHH4sjAcOfD6KgKT2g&s',
        priceUsdC: 85400,
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-04-20',
        coords: coordsMap.prop010,
        area: 300,
        beds: 5,
        bath: 4
    },
    {
        id: 'prop011',
        name: 'Token Tower',
        description: 'A 150 m² high-rise residence with NFT-secured private elevator. Three bedrooms, three bathrooms, rooftop sky lounge, landscaped terrace, and floor-to-ceiling windows showcasing cityscape vistas.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        priceUsdC: 48800,
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-01-25',
        coords: coordsMap.prop011,
        area: 150,
        beds: 3,
        bath: 3
    },
    {
        id: 'prop012',
        name: 'Smart Studio',
        description: 'A compact 45 m² automated studio for digital nomads. One bedroom alcove, one bathroom, robotic kitchenette, integrated IoT sensors, and smartphone-controlled lighting and climate.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
        priceUsdC: 10600,
        country: 'Estonia',
        city: 'Pärnu',
        postDate: '2025-03-28',
        coords: coordsMap.prop012,
        area: 45,
        beds: 1,
        bath: 1
    },
    {
        id: 'prop013',
        name: 'Blockchain Barn',
        description: 'A 130 m² minimalist barn conversion with blockchain amenities. Three bedrooms, two bathrooms, rooftop solar panels, blockchain-recorded energy usage, and vaulted open-plan living.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae',
        priceUsdC: 17400,
        country: 'Estonia',
        city: 'Viljandi',
        postDate: '2025-02-15',
        coords: coordsMap.prop013,
        area: 130,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop014',
        name: 'Sky Yacht',
        description: 'A 220 m² sky-floating residence with autopilot navigation and crypto dashboard. Offers three bedrooms, three bathrooms, full marine galley, drone launch pad, and panoramic synthetic-glass windows.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        priceUsdC: 110400,
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-10',
        coords: coordsMap.prop014,
        area: 220,
        beds: 3,
        bath: 3
    },
    {
        id: 'prop015',
        name: 'Pixel Palace',
        description: 'A 350 m² Art-Deco mansion designed for NFT exhibitions. Six bedrooms, five bathrooms, grand projection hall, programmable LED walls, and integrated digital art display systems.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
        priceUsdC: 77600,
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-04-05',
        coords: coordsMap.prop015,
        area: 350,
        beds: 6,
        bath: 5
    },
    {
        id: 'prop016',
        name: 'Fjord Retreat',
        description: 'A 210 m² waterfront villa with private dock and micro-hydroelectric roof. Four bedrooms, three bathrooms, fjord-facing floor-to-ceiling windows, and remote-controlled water purification.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3',
        priceUsdC: 35200,
        country: 'Estonia',
        city: 'Tartu',
        postDate: '2025-03-06',
        coords: coordsMap.prop016,
        area: 210,
        beds: 4,
        bath: 3
    },
    {
        id: 'prop017',
        name: 'Oasis Cube',
        description: 'A 100 m² desert cube house with integrated NFT gallery. Two bedrooms, two bathrooms, solar-cooling walls, thermal insulation, and biometric blockchain entry.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
        priceUsdC: 40400,
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-24',
        coords: coordsMap.prop017,
        area: 100,
        beds: 2,
        bath: 2
    },
    {
        id: 'prop018',
        name: 'Retro Villa',
        description: 'A 180 m² retro-futuristic villa with neon accents and automated check-in. Features three bedrooms, two bathrooms, an 80s-style bar, color-changing neon fixtures synced to music, and open social spaces.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1',
        priceUsdC: 59800,
        country: 'UAE',
        city: 'Abu Dhabi',
        postDate: '2025-03-15',
        coords: coordsMap.prop018,
        area: 180,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop019',
        name: 'Arctic Base',
        description: 'A 160 m² autonomous Arctic smart home with geothermal heating and satellite internet. Three bedrooms, two bathrooms, high-performance insulation, and fully off-grid green-energy systems.',
        hashtag: 'trade',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        priceUsdC: 53400,
        country: 'Estonia',
        city: 'Tallinn',
        postDate: '2025-02-23',
        coords: coordsMap.prop019,
        area: 160,
        beds: 3,
        bath: 2
    },
    {
        id: 'prop020',
        name: 'Lava Loft',
        description: 'A 90 m² industrial loft built atop cooled lava flows. Two bedrooms, one bathroom, heated floors, VR media room, live-edge lava stone countertops, and floor-to-ceiling panoramic glass.',
        hashtag: 'auction',
        image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
        priceUsdC: 30200,
        country: 'UAE',
        city: 'Dubai',
        postDate: '2025-04-30',
        coords: coordsMap.prop020,
        area: 90,
        beds: 2,
        bath: 1
    }
];

export default properties;
