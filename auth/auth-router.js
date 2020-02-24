const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const authenticate = require('./authenticate-middleware');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    then(saved => {
      const token = genToken(saved);
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post('/login', authenticate, (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ username: user.username, token: token })
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err})
    })
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };

  const options = { expiresIn: '1h' };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
};

module.exports = router;
