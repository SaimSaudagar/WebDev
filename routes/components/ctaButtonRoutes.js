const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
    createCTAButton,
    getCTAButton,
    updateCTAButton,
    deleteCTAButton
} = require('../../controllers/components/ctaButtonController');

router.post('/cta-button', authMiddleware.authenticateAdmin, createCTAButton);
router.get('/cta-button/:id', authMiddleware.authenticateAdmin, getCTAButton);
router.put('/cta-button/:id', authMiddleware.authenticateAdmin, updateCTAButton);
router.delete('/cta-button/:id', authMiddleware.authenticateAdmin, deleteCTAButton);

module.exports = router;
