const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
    createCTAButton,
    getCTAButton,
    updateCTAButton,
    deleteCTAButton
} = require('../../controllers/components/ctaButtonController');

router.post('/cta-button', authMiddleware, createCTAButton);
router.get('/cta-button/:id', authMiddleware, getCTAButton);
router.put('/cta-button/:id', authMiddleware, updateCTAButton);
router.delete('/cta-button/:id', authMiddleware, deleteCTAButton);

module.exports = router;
