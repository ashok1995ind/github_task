const userController = require('../controllers/user.controller');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const validator = require('../common/validator');
const {
    check,
    validationResult
} = require('express-validator');
/**
 * route /get-repos to fetch the repositories of the user
 */
router.get("/get-repos", validator.validateUsername(), async (req, res) => {
    await validator.errorResponse(req, res);
    await userController.getRepos(req).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/**
 * route /get-user to fetch the user details
 */
router.get("/get-user", validator.validateUsername(), async (req, res) => {
    await validator.errorResponse(req, res);
    userController.fetchUser(req).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
})

module.exports = router