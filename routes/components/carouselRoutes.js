const express = require('express');
const router = express.Router();
const {
    createCarousel,
    getCarousels,
    updateCarousel,
    deleteCarousel
} = require('../../controllers/components/carouselController');
router.post('/carousels', createCarousel);
router.get('/carousels', getCarousels);
router.put('/carousels/:id', updateCarousel);
router.delete('/carousels/:id', deleteCarousel);

module.exports = router;
