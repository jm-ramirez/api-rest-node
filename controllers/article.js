const validator = require('validator');
const Article = require('../models/Article');

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

const create = (req, res) => {
    //Get parameters by post to save
    let parameters = req.body;

    //Validate data
    try {
        let validate_title = !validator.isEmpty(parameters.title) &&
                             validator.isLength(parameters.title, {min: 5, max: undefined});
        let validate_content = !validator.isEmpty(parameters.content);

        if(!validate_title || !validate_content){
            throw new Error('The information has not been validated!');
        }
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing data to send'
        })
    }

    //Create object to save
    const article = new Article(parameters);

    //Assign values ​​to object based on the model (manual or automatic)
    

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
    let query = Article.find({}).exec((error, articles) => {
        if(error || !articles){
            return res.status(400).json({
                status: 'error',
                message: 'No articles found'
            })
        }

        return res.status(200).send({
            status: 'success',
            articles
        })
    });
};

module.exports = {
    test,
    course,
    create,
    list
}