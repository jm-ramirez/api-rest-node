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

module.exports = {
    test,
    course
}