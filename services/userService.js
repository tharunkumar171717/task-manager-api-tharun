const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const index=require('../config/index');
async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({username, email, password: hashedPassword});
}
// login function
async function loginUser(email, password) {
  const user = await User.findOne({where: {email}});
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
      {id: user.id, username: user.username},
      index.JWT_SECRET,
      {expiresIn: '1h'},
  );

  return {user, token};
}

module.exports = {registerUser, loginUser};
