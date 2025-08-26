const {registerUser, loginUser} = require('../services/userService');
// register functionality using services
exports.register = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};
// login functionality using services
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const result = await loginUser(email, password);

    if (!result) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    res.json({token: result.token});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

