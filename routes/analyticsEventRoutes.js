const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    pageViews,
    trackEvent
} = require('../controllers/analyticsEventController');

router.post('/track', authMiddleware.authenticateAdmin, trackEvent);
router.get('/page-views', authMiddleware.authenticateAdmin, pageViews);

module.exports = router;
