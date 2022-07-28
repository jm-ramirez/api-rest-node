const { validateArticle } = require('../helpers/validate');
const Article = require('../models/Article');
const fs = require('fs');
const path = require('path');

const test = (req, res) => {
    return res.status(200).json({
        message: 'I am a test action in my item controller'
    });
};

const course = (req, res) => {
    console.log('se ha ejecutado');
    return res.status(200).json([{
        course: 'Api rest node',
        autor: 'Juan Manuel Ramirez',
        url: 'juanmanuel.com'
    },
    {
        course: 'Api rest node',
        autor: 'Juan Manuel Ramirez',
        url: 'juanmanuel.com'
    }]);
};

const createArticle = (req, res) => {
    //Get parameters by post to save
    let parameters = req.body;

    //Validate data
    try {
        validateArticle(parameters);   
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing data to send'
        });
    }

    //Create object to save
    const article = new Article(parameters);

    //Save article in database
    article.save((error, articleSaved) => {
        if(error || !articleSaved){
            return res.status(400).json({
                status: 'error',
                message: 'The article has not been saved'
            })
        }

        //Return result
        return res.status(200).json({
            status: 'success',
            article: articleSaved,
            message: 'Article created successfully'
        })
    });
};

const list = (req, res) => {
    let query = Article.find({});

    if(req.params.latest){
        query.limit(1);
    }

    query.sort({date: -1}).exec((error, articles) => {
        if(error || !articles){
            return res.status(400).json({
                status: 'error',
                message: 'No articles found'
            })
        }

        return res.status(200).send({
            status: 'success',
            count: articles.length,
            articles
        })
    });
};

const one = (req, res) => {
    //Get id by url
    let id = req.params.id;

    //Search article
    Article.findById(id, (error, article) => {
        //If it doesn't exist, return error
        if(error || !article){
            return res.status(400).json({
                status: 'error',
                message: 'No articles found'
            })
        }

        //Return result
        return res.status(200).json({
            status: 'success',
            article
        })
    });
};

const deleteArticle = (req, res) => {
    let id = req.params.id;

    Article.findOneAndDelete({_id: id}, (error, articleDeleted) => {
        if(error || !articleDeleted){
            return res.status(500).json({
                status: 'error',
                message: 'Error deleting article'
            })
        }

        return res.status(200).json({
            status: 'success',
            article: articleDeleted,
            message: 'Article deleted'
        })
    });
};

const editArticle = (req, res) => {
    //Get article id
    let id = req.params.id;

    //Get parameters by post to save
    let parameters = req.body;

    //Validate data
    try {
        validateArticle(parameters);   
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing data to send'
        });
    }

    //Search and update article
    Article.findOneAndUpdate({_id: id}, req.body, { new: true }, (error, articleUpdated) => {
        if(error || !articleUpdated){
            return res.status(500).json({
                status: 'error',
                message: 'Failed to update'
            });
        }

        //Return response
        return res.status(200).json({
            status: 'success',
            article: articleUpdated
        })
    })
};

const upload = (req, res) => {
    //Cunfigure multer

    //Get uploaded image file
    if(!req.file && !req.file){
        return res.status(404).json({
            status: 'error',
            message: 'Invalid request'
        })
    }

    //Name of file
    let fileName = req.file.originalname;

    //file extension
    let splitFile = fileName.split("\.");
    let fileExtension = splitFile[1];
    console.log(fileExtension);
    //Validate extension
    if(fileExtension !== 'png' && fileExtension !== 'jpg' && 
       fileExtension !== 'jpeg' && fileExtension !== 'gif'){
        // Delete file and give reponse
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid image'
            })
        })
    }else{
        //Get article id
        let id = req.params.id;

        //Search and update article
        Article.findOneAndUpdate({_id: id}, {image: req.file.filename}, { new: true }, (error, articleUpdated) => {
            if(error || !articleUpdated){
                return res.status(500).json({
                    status: 'error',
                    message: 'Failed to update'
                });
            }

            //Return response
            return res.status(200).json({
                status: 'success',
                article: articleUpdated,
                file: req.file
            })
        });
    }    
};

const image = (req, res) =>{
    let file = req.params.file;
    let url = `./images/articles/${file}`;

    fs.stat(url, (error, exist) => {
        if(exist){
            return res.sendFile(path.resolve(url));
        }else{
            return res.status(404).json({
                status: 'error',
                message: 'The image does not exist',
                exist,
                file,
                url
            });
        }
    })

};

const search = (req, res) => {
    //Get the search string
    let search =req.params.search;

    //Find OR 
    Article.find({ "$or": [
        { 'title': { '$regex': search, '$options': 'i' } },
        { 'content': { '$regex': search, '$options': 'i' } },
    ]})
    .sort({ date: -1 })
    .exec((error, foundArticles) => {
        if(error || !foundArticles || foundArticles.length <= 0){
            return res.status(404).json({
                status: 'error',
                message: 'No articles found'
            })
        }

        return res.status(200).json({
            status: 'success',
            foundArticles

        })
    })


    //Order 

    //Execute query

    //Return result
}

module.exports = {
    test,
    course,
    createArticle,
    list,
    one,
    deleteArticle,
    editArticle,
    upload,
    image,
    search
}