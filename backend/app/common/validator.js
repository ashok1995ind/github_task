methods = {};
const {
    check,
    validationResult
} = require('express-validator');
methods.validateUsername = () => {
    return [
        check('username')
        .not()
        .isEmpty()
        .withMessage('username is required')
    ]
}

methods.errorResponse = async (req, res) => {
    var errors = await validationResult(req).array();
    if (errors.length > 0) {
        return res.status(500).send(errors);
    }
}

module.exports = methods;