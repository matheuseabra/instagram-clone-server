const bcrypt = require('bcryptjs');
const UserService = require('../services/UserService');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const passwordHash = bcrypt.hash(password, 12);
      const newUser = UserService.register({ username, email, passwordHash });

      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  login: () => {},
};
