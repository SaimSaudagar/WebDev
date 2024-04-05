const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
    createImage,
    getImage,
    updateImage,
    deleteImage
} = require('../../controllers/components/imageController');

router.post('/image', authMiddleware.authenticateAdmin, createImage);
router.get('/image/:id', authMiddleware.authenticateAdmin, getImage);
router.put('/image/:id', authMiddleware.authenticateAdmin, updateImage);
router.delete('/image/:id', authMiddleware.authenticateAdmin, deleteImage);

module.exports = router;
