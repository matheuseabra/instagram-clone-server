const User = require('../models/User');
const errorHandler = require('../middlewares/errorHandler');

module.exports = {
  register: async (username, email, passwordHash) => {
    try {
      const user = await User.create({ username, email, passwordHash });
      return user;
    } catch (err) {
      return errorHandler(err);
    }
  },
  login: () => {},
};
