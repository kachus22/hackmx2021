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
      const accessToken = jwt.sign({ role: 'admin' }, config.jwtSecret,  { expiresIn: '24h' });
      res.json({ accessToken });
    } else {
      res.send('Username or password incorrect.');
    }
  }
}