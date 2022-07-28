const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');

//Test routes
router.get('/test-router', ArticleController.test);
router.get('/test-course', ArticleController.course);

//useful route
router.post('/create', ArticleController.create);
router.get('/list', ArticleController.list);

module.exports = router;