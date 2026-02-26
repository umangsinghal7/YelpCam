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



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author : '699aeec2f67dc7d8670ce01f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'hlo my name is umang and this is a sample description for yelp camp',
            price : Math.floor(Math.random() * 200) + 10,
            image : [
                {
        url: 'https://res.cloudinary.com/dggz1dufk/image/upload/v1772049310/YelpCamp/akcgbjg2lczld84sniaq.jpg',
        filename: 'YelpCamp/akcgbjg2lczld84sniaq',
    },
    {
        url: 'https://res.cloudinary.com/dggz1dufk/image/upload/v1772050120/YelpCamp/ientkallgrlxoovj6of9.jpg',
        filename: 'YelpCamp/ientkallgrlxoovj6of9',
    }
            ]
        })
        await camp.save();
    }
} 
seedDB().then(() => {
    mongoose.connection.close();
    console.log(`Database connection closed`);
});


        