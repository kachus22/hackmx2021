const jwt = require('jsonwebtoken');

const { config } = require('../services/config');
const pw = "adminpw";

module.exports = {
  // Admin login
  login:  async (req, res) => {
    const { password } = req.body
    console.log(password, pw)
    if (password == pw) {
      // Generate an access token
      const token = jwt.sign({ role: 'admin' }, config.jwtSecret,  { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.json({ error: 'Username or password incorrect.' });
    }
  }
}