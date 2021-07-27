const userRoute = require('./user.route');

module.exports = (app) => {
    app.use(
        process.env.APIVERSION || '/api/v1',
        userRoute
    );
};