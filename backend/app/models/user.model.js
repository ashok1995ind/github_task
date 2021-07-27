const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model to store the user details of the GitHub users.
 */
const User = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        default: null
    },
    login: {
        type: String,
        default: null
    },
    git_id: {
        type: String,
        default: null
    },
    url: {
        type: String,
    },
    repos_url: {
        type: String
    },
    created_at: {
        type: Date
    },
    avatar_url: {
        type: String
    },
    followers: {
        type: Number
    },
    following: {
        type: Number
    },
    public_repos: {
        type: Number
    }
});

const UserModel = mongoose.model('users', User);
module.exports = UserModel;