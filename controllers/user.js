const modelUsers = require("../models/user");

module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  logoutUser,
  createUser,
  getUserById,
  editUser
};

async function getUsers(req, res) {
  try {
    const userData = await modelUsers.getUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await modelUsers.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await modelUsers.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = await modelUsers.createUser(req.body);
    console.log(userData);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await modelUsers.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const data = await modelUsers.getUserById(req.user.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function editUser(req, res) {
  const userData = await modelRestaurant.getUserById(req.params.Id);
  if (!userData.id != req.user.id) {
    return res.status(401).json("Unauthorized");
  } else {
    try {
      const data = await modelUser.editUser(
        req.params.Id,
        req.body
      );
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }
}