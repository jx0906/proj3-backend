const modelUser = require("../models/user");

async function createUser(req, res) {
    try {
        const data = await modelUser.createUser(req.body)
        // redirects user to signin page after creating account
        res.json(userData)
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMsg: err.message });
    }
}

module.exports = {
    createUser
}