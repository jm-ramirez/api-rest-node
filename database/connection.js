const mongoose = require("mongoose");

const connection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/my_blog');

        // Parameters inside object // only in case of warning
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log('Successfully connected to the database');

    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect to database');
    }
};

module.exports = {
    connection
}