const food = [
    { name: 'McDonalds', cat: 'food' },
    { name: 'Dominos', cat: 'food' },
    { name: 'ZomatoLtd', cat: 'food' },
    { name: 'EatSure', cat: 'food' },
    { name: 'Swiggy', cat: 'food' },
    { name: 'Pizza Hut', cat: 'food' },
    { name: 'KFC', cat: 'food' },
    { name: 'Taco Bell', cat: 'food' },
    { name: 'Burger King', cat: 'food' },
    { name: 'Subway', cat: 'food' },
    { name: 'Starbucks', cat: 'food' },
    { name: 'Cafe', cat: 'food' },
    { name: 'CCD', cat: 'food' },
    { name: 'Fasos', cat: 'food' },
    { name: 'Barbeque Nation', cat: 'food' },
]

const movies = [
    { name: 'PVR', cat: 'movies' },
    { name: 'INOX', cat: 'movies' },
    { name: 'Cinepolis', cat: 'movies' },
    { name: 'bookmyshow', cat: 'movies' },
]

const network = [
    { name: 'airtel', cat: 'bills' },
    { name: 'idea', cat: 'bills' },
    { name: 'vodafone', cat: 'bills' },
    { name: 'VI', cat: 'bills' },
    { name: 'jio', cat: 'bills' },
    { name: 'BSNL', cat: 'bills' },
    { name: 'bescom', cat: 'bills' },
    { name: 'Indane', cat: 'bills' },
    { name: 'HP', cat: 'bills' },
    { name: 'BharatGas', cat: 'bills' },
    { name: 'TATA', cat: 'bills' },
    { name: 'Dishtv', cat: 'bills' },
]

const shopping = [
    { name: 'flipkart', cat: 'shopping' },
    { name: 'Amazon', cat: 'shopping' },
    { name: 'tatacliq', cat: 'shopping' },
    { name: 'myntra', cat: 'shopping' },
    { name: 'SRIAMMA', cat: 'shopping' },
    { name: 'snapdeal', cat: 'shopping' },
    { name: 'ajio', cat: 'shopping' },
    { name: 'meesho', cat: 'shopping' },
    { name: 'souledstore', cat: 'shopping' },
    { name: 'levis', cat: 'shopping' },
]

const travel = [
    { name: 'YULU BIKES', cat: 'travel' },
    { name: 'yatraonl', cat: 'travel' },
    { name: 'IRCTCWe', cat: 'travel' },
    { name: 'VOGO', cat: 'travel' },
    { name: 'ZOOM', cat: 'travel' },
    { name: 'Indigo', cat: 'travel' },
    { name: 'Air India', cat: 'travel' },
    { name: 'Spicejet', cat: 'travel' },
    { name: 'Go First', cat: 'travel' },
    { name: 'Air Asia', cat: 'travel' },
    { name: 'Vistara', cat: 'travel' },
    { name: 'Qatar', cat: 'travel' },
    { name: 'Lufthansa', cat: 'travel' },
    { name: 'Booking', cat: 'travel' },
    { name: 'Airbnb', cat: 'travel' },
    { name: 'Oyo', cat: 'travel' },
    { name: 'Trivago', cat: 'travel' },
    { name: 'makemytrip', cat: 'travel' },
    { name: 'redbus', cat: 'travel' },
    { name: 'VRL', cat: 'travel' },
    { name: 'SRS', cat: 'travel' },
    { name: 'goibibo', cat: 'travel' },
    { name: 'yatraonl', cat: 'travel' },
]

const categories = [
    ...shopping,
    ...movies,
    ...travel,
    ...network,
    ...food
]

module.exports = categories;