const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
    createTextBlock,
    getTextBlock,
    updateTextBlock,
    deleteTextBlock,
    listTextBlocks,
    } = require('../../controllers/components/textBlockController');

router.post('/', authMiddleware, createTextBlock);
router.get('/:id', authMiddleware, getTextBlock);
router.put('/:id', authMiddleware, updateTextBlock);
router.delete('/:id', authMiddleware, deleteTextBlock);
router.get('/:pageId', authMiddleware, listTextBlocks);

module.exports = router;
