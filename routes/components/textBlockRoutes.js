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

router.post('/', authMiddleware.authenticateAdmin, createTextBlock);
router.get('/:id', authMiddleware.authenticateAdmin, getTextBlock);
router.put('/:id', authMiddleware.authenticateAdmin, updateTextBlock);
router.delete('/:id', authMiddleware.authenticateAdmin, deleteTextBlock);
router.get('/:pageId', authMiddleware.authenticateAdmin, listTextBlocks);

module.exports = router;
