const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createCampaign,
    sendCampaign
} = require('../controllers/emailCampaignController');

router.post('/create', authMiddleware.authenticateAdmin, createCampaign);
router.post('/send/:id', authMiddleware.authenticateAdmin, sendCampaign);

module.exports = router;
