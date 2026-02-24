const express = require('express');
const router = express.Router({ mergeParams: true });

const CatchAsync = require('../utils/CatchAsync');
const expressError = require('../utils/ExpressError');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');
const { IsLoggedin, validateReview, verifyReviewAuthor } = require('../middleware');

const reviews = require('../controllers/reviews');



router.post('/', validateReview, IsLoggedin, CatchAsync(reviews.newreview));

router.delete('/:reviewid', IsLoggedin, verifyReviewAuthor, CatchAsync(reviews.deletereview));


module.exports = router;