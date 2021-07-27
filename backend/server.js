const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./app/common/logger');
const app = express();
require('dotenv').config();
mongoose.Promise = global.Promise;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        "message": "Server running"
    });
})
require('./app/config/db.config'); //Database Configuration
require('./app/routes/index.route')(app);
const port = 4000; //Application Port
app.listen(port, () => logger.info(`listening on port ${port}`));

module.exports = app;