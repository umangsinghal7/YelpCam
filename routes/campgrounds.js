const express = require('express');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');
const Campground = require('../models/campground');
const Reviewroutes = require('./review');
const { campgroundSchema } = require('../schemas.js');
const  campgrounds = require('../controllers/campgrounds');
const { IsLoggedin , validateCampground , verifyAuthor } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });



router.route('/')
    .get(CatchAsync(campgrounds.index))
    .post( IsLoggedin,upload.array('image'),validateCampground, CatchAsync(campgrounds.createCampground));
    

router.get('/new', IsLoggedin, CatchAsync(campgrounds.renderNewForm));

    router.route('/:id')
        .get(CatchAsync(campgrounds.showCampground))
        .put(IsLoggedin, verifyAuthor,upload.array('image') ,validateCampground, CatchAsync(campgrounds.updateCampground))
        .delete(IsLoggedin, verifyAuthor, CatchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', IsLoggedin,verifyAuthor ,CatchAsync(campgrounds.renderEditForm));
router.use('/:id/reviews', Reviewroutes);

module.exports = router;