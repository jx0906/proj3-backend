const modelUser = require("../models/user");

async function createUser(req, res) {
    try {
        const data = await modelUser.createUser(req.body)
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMsg: err.message });
    }
}