/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' })
        }
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
  res.status(401).json({ you: 'shall not pass!' });
};
