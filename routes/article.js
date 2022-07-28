const express = require('express');
const multer = require('multer');
const ArticleController = require('../controllers/article');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/articles');
    },
    filename: function(req, file, cb) {
        cb(null, `article${Date.now()}${file.originalname}`);
    },
});

const uploaded = multer({storage: storage});


//Test routes
router.get('/test-router', ArticleController.test);
router.get('/test-course', ArticleController.course);

//useful route
router.post('/create', ArticleController.createArticle);
router.get('/list/:latest?', ArticleController.list);
router.get('/article/:id', ArticleController.one);
router.delete('/article/:id', ArticleController.deleteArticle);
router.put('/article/:id', ArticleController.editArticle);
router.post('/upload-image/:id', [uploaded.single('file')], ArticleController.upload);

module.exports = router;
