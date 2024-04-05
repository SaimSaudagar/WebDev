const express = require('express');
const router = express.Router();
const {
    createPage,
    getPage,
    updatePage,
    deletePage,
    listPages,
    changeContentOrder
  } = require('../controllers/pageController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateAdmin, createPage);
router.get('/:slug', getPage);
router.put('/:slug', authMiddleware.authenticateAdmin, updatePage);
router.delete('/:slug', authMiddleware.authenticateAdmin, deletePage);
router.get('/', listPages);
router.put('/reorder/:slug', changeContentOrder);

module.exports = router;
