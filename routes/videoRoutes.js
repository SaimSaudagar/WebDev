// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo
} = require('../controllers/components/videoController');

router.post('/create', authMiddleware.authenticateAdmin, createVideo);
router.get('/get', authMiddleware.authenticateAdmin, getVideos);
router.put('/update/:id', authMiddleware.authenticateAdmin, updateVideo);
router.delete('/delete/:id', authMiddleware.authenticateAdmin, deleteVideo);

module.exports = router;
