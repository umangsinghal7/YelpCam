const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp')


const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected")
}); 

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const images = [
{
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    filename: 'camp1'
},
{
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    filename: 'camp2'
},
{
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    filename: 'camp3'
},
{
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    filename: 'camp4'
},
{
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
    filename: 'camp5'
},
{
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    filename: 'camp6'
},
{
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    filename: 'camp7'
},
{
    url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
    filename: 'camp8'
}
];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author : '699aeec2f67dc7d8670ce01f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Beautiful campground for nature lovers.',
            price : Math.floor(Math.random() * 200) + 10,
            image: [images[Math.floor(Math.random() * images.length)]]
        })
        await camp.save();
    }
} 
seedDB().then(() => {
    mongoose.connection.close();
    console.log(`Database connection closed`);
});


        