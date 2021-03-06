const mongoose = require('mongoose');
const logger = require('../common/logger');
const dotenv = require('dotenv');
const options = {
    useNewUrlParser: true,
    bufferMaxEntries: 0, // Disable node driver's buffering as well
    keepAlive: true,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 300000
};

mongoose.connect(process.env.DBURL, options).catch(() => {
    logger.error('db: mongodb error ');
    process.exit(1);
});

mongoose.connection.on('error', function (e) {
    logger.error('db: mongodb error ' + e);
    mongoose.connect(process.env.DBURL, options).catch(() => {
        process.exit(1);
    });
});

mongoose.connection.on('connected', function () {
    logger.info('Connected to database !: ' + process.env.DBURL);
});

mongoose.connection.on('disconnecting', function () {
    logger.info('database is disconnecting!!!');
});

mongoose.connection.on('disconnected', function () {
    logger.warn('database is disconnected!!!');
    mongoose.connect(process.env.DBURL, options).catch(() => {
        process.exit(1);
    });
});

mongoose.connection.on('reconnected', function () {
    logger.info('db: mongodb is reconnected: ' + process.env.DBURL);
});

mongoose.connection.on('timeout', function (e) {
    logger.warn('db: mongodb timeout ' + e);
});

mongoose.connection.on('close', function () {
    logger.warn('db: mongodb connection closed');
});

module.exports = mongoose;