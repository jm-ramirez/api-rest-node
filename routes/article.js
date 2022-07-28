const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');

//Test routes
router.get('/test-router', ArticleController.test);
router.get('/test-course', ArticleController.course);

//useful route
router.post('/create', ArticleController.createArticle);
router.get('/list/:latest?', ArticleController.list);
router.get('/article/:id', ArticleController.one);
router.delete('/article/:id', ArticleController.deleteArticle);
router.put('/article/:id', ArticleController.editArticle);

module.exports = router;
