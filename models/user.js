const daoUser = require("../daos/user");
const utilSecurity = require("../util/security");

module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  createUser,
  logoutUser,
};

function getUsers(queryFields) {
  return daoUser.find(queryFields);
}

async function getLoginDetails(queryFields) {
  const loginFields = {
    name: 1,
    salt: 1,
    iterations: 1,
  };
  if (!queryFields.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  const userEmail = decodeURIComponent(queryFields.email);
  const loginFieldsRes = await daoUser.findOne(
    { email: userEmail },
    loginFields
  );
  if (loginFieldsRes == null || Object.keys(loginFieldsRes).length == 0) {
    return { success: false, error: "Invalid email" };
  }
  return { success: true, data: loginFieldsRes };
}

async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await daoUser.findOne({
    email: body.email,
    password: body.password,
  });
  if (!user || user.length === 0) {
    return { success: false, error: "Invalid email/password" };
  }

  const jwtPayload = {
    user: user.name,
    email: user.email,
    isOwner: user.isOwner,
    name: user.name,
    id: user._id,
  };
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  // daoUser.updateOne({ email: body.email }, { token: token, expire_at: expiry });
  await daoUser.findByIdAndUpdate(user._id, {
    token: token,
    expire_at: expiry,
  });
  return { success: true, data: token };
}

async function createUser(body) {
  const user = await daoUser.findOne({ email: body.email });
  if (user) {
    return { success: false, error: "User already exist" };
  }
  const newUser = await daoUser.create(body);
  return { success: true, data: newUser };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  await daoUser.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );
  return { success: true };
}
