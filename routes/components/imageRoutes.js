const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
    createImage,
    getImage,
    updateImage,
    deleteImage
} = require('../../controllers/components/imageController');

router.post('/image', authMiddleware, createImage);
router.get('/image/:id', authMiddleware, getImage);
router.put('/image/:id', authMiddleware, updateImage);
router.delete('/image/:id', authMiddleware, deleteImage);

module.exports = router;
