const express = require('express');
const router = express.Router();
const {
    createPage,
    getPage,
    updatePage,
    deletePage,
    listPages,
  } = require('../controllers/pageController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPage);
router.get('/:slug', authMiddleware, getPage);
router.put('/:slug', authMiddleware, updatePage);
router.delete('/:slug', authMiddleware, deletePage);
router.get('/', authMiddleware, listPages);

module.exports = router;
