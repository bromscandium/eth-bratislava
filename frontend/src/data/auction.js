// src/data/auction.js
const auctionHistories = {
    prop001: [
        {bidder: '0xAbC123EfG', price: 55000, time: '2025-04-10T12:00:00Z'},
        {bidder: '0xDeF456HiJ', price: 56500, time: '2025-04-11T09:30:00Z'},
        {bidder: '0x123AbC456', price: 57000, time: '2025-04-12T16:45:00Z'}
    ],
    prop003: [
        {bidder: '0xXyZ789KlM', price: 24000, time: '2025-03-04T10:15:00Z'},
        {bidder: '0xOpQ012RsT', price: 24500, time: '2025-03-05T14:20:00Z'},
        {bidder: '0xUvW345XyZ', price: 24600, time: '2025-03-05T18:05:00Z'}
    ],
    prop006: [
        {bidder: '0xAaBbCcD', price: 31000, time: '2025-02-26T11:00:00Z'},
        {bidder: '0xEeFfGgH', price: 31500, time: '2025-02-27T15:45:00Z'},
        {bidder: '0xIiJjKkL', price: 32000, time: '2025-02-28T08:30:00Z'}
    ],
    prop008: [
        {bidder: '0xMnO456PqR', price: 26000, time: '2025-04-01T11:10:00Z'},
        {bidder: '0xStU789VwX', price: 26500, time: '2025-04-01T15:45:00Z'}
    ],
    prop010: [
        {bidder: '0xYzA123BcD', price: 85000, time: '2025-04-19T13:00:00Z'},
        {bidder: '0xEfG456HiJ', price: 85400, time: '2025-04-20T10:30:00Z'}
    ],
    prop011: [
        {bidder: '0xKlM789NoP', price: 48000, time: '2025-01-24T09:20:00Z'},
        {bidder: '0xQrS012TuV', price: 48800, time: '2025-01-25T14:55:00Z'}
    ],
    prop013: [
        {bidder: '0xWxY345ZaB', price: 17000, time: '2025-02-14T12:40:00Z'},
        {bidder: '0xCdE678FgH', price: 17400, time: '2025-02-15T16:10:00Z'}
    ],
    prop015: [
        {bidder: '0xIjK901LmN', price: 77000, time: '2025-04-04T08:05:00Z'},
        {bidder: '0xOpQ234RsT', price: 77600, time: '2025-04-05T17:30:00Z'}
    ],
    prop017: [
        {bidder: '0xUvW567XyZ', price: 40000, time: '2025-03-23T11:50:00Z'},
        {bidder: '0xAbC890DeF', price: 40400, time: '2025-03-24T15:15:00Z'}
    ],
    prop020: [
        {bidder: '0xGhI123JkL', price: 30000, time: '2025-04-29T10:25:00Z'},
        {bidder: '0xMnO456PqR', price: 30200, time: '2025-04-30T14:45:00Z'}
    ]
};

export default auctionHistories;

export const auctionEndTimes = {
    prop001: '2025-05-25T00:00:00Z', // +1d
    prop003: '2025-05-26T00:00:00Z', // +2d
    prop006: '2025-05-27T00:00:00Z', // +3d
    prop008: '2025-05-25T00:00:00Z', // +1d
    prop010: '2025-05-26T00:00:00Z', // +2d
    prop011: '2025-05-27T00:00:00Z', // +3d
    prop013: '2025-05-25T00:00:00Z', // +1d
    prop015: '2025-05-26T00:00:00Z', // +2d
    prop017: '2025-05-27T00:00:00Z', // +3d
    prop020: '2025-05-25T00:00:00Z'  // +1d
};


