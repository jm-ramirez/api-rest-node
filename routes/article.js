const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');

//Test routes
router.get('/test-router', ArticleController.test);
router.get('/test-course', ArticleController.course);

//useful route
router.post('/create', ArticleController.create)

module.exports = router;