const UserModel = require('../models/user.model');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

module.exports = class Tasks {
    /**
     * getRepos is the static method to fetch the repositories of the
     * particular username
     */
    static getRepos(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    username
                } = req.query;
                await axios({
                    method: "get",
                    url: `https://api.github.com/users/${username}/repos`,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
                    }
                }).then((res) => {
                    resolve({
                        data: res['data']
                    });
                }).catch((err) => {
                    reject({
                        'msg': "Username does not exist"
                    })
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    /**
     * fetchUser is the static method to fetch the user details of the
     * particular username
     */
    static fetchUser(req) {
        return new Promise(async (resolve, reject) => {
            const {
                username
            } = req.query;
            try {
                let user = await UserModel.findOne({
                    login: username
                });
                if (user) {
                    resolve({
                        data: user
                    });
                } else {
                    await axios({
                        method: "get",
                        url: `https://api.github.com/users/${username}`,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
                        }
                    }).then(async (res) => {
                        let userDate = new UserModel({
                            _id: new ObjectId(),
                            name: res['data'].name,
                            login: res['data'].login,
                            git_id: res['data'].id,
                            url: res['data'].url,
                            repos_url: res['data'].html_url,
                            avatar_url: res['data'].avatar_url,
                            created_at: res['data'].created_at,
                            followers: res['data'].followers,
                            following: res['data'].following,
                            public_repos: res['data'].public_repos
                        })
                        let result = await userDate.save();
                        resolve({
                            data: result
                        });
                    }).catch((err) => {
                        reject({
                            "msg": "Username does not exist"
                        })
                    })
                }
            } catch (err) {
                reject({
                    'msg': 'Something went wrong!'
                })
            }
        });
    }
}